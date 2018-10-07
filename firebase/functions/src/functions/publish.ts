import * as express from "express";
import * as firebaseAdmin from "firebase-admin";
import { fileParser } from "express-multipart-file-parser";
import fetch from "node-fetch";
import * as tar from "tar-fs";
import * as path from "path";
import * as fs from "fs";
import { File as GSFile } from "@google-cloud/storage";
import * as yaml from "js-yaml";
import * as rimraf from "rimraf";
import { ChartMetadata } from "../model";
const gunzip = require("gunzip-maybe");

type RefreshTokenPayload = {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
};

export default function publish(
  config: any,
  app: express.Application = express()
) {
  app.post(
    "/",
    fileParser({
      rawBodyOptions: {
        limit: "10mb"
      }
    }),
    async (req, res) => {
      try {
        const refreshToken = req.header("bearer");

        const refreshTokenResponse = await fetch(
          `https://securetoken.googleapis.com/v1/token?key=${config.apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              grant_type: "refresh_token",
              refresh_token: refreshToken
            })
          }
        );

        if (refreshTokenResponse.status !== 200) {
          const errorObj = await refreshTokenResponse.json();

          console.log(
            `Failed to refresh token with status ${
              refreshTokenResponse.status
            } and object ${JSON.stringify(errorObj)}`
          );

          res.status(403).json({
            code: errorObj.code
          });

          return;
        }

        const refreshTokenJson: RefreshTokenPayload = await refreshTokenResponse.json();

        const files = (req as any).files;

        if (!files || files.length === 0) {
          res.status(400).send("No files were uploaded.");
          console.warn("No files were uploaded");
          return;
        }

        const bucket = firebaseAdmin.storage().bucket();

        const {
          originalname,
          buffer: reqFile
        }: {
          originalname: string;
          buffer: Buffer;
        } = files[0];

        const cloudFilePath = `/users/${
          refreshTokenJson.user_id
        }/charts/${originalname}`;

        const cloudFile = bucket.file(cloudFilePath);
        await cloudFile.save(reqFile);

        const chartMetadata = await getChartMetadata(cloudFile);

        const chartDoc = firebaseAdmin
          .firestore()
          .collection("users")
          .doc(refreshTokenJson.user_id)
          .collection("charts")
          .doc(chartMetadata.chartYaml.name);

        await chartDoc.set({
          makeFirebaseWork: true
        });

        const doc = chartDoc
          .collection("versions")
          .doc(chartMetadata.chartYaml.version);

        doc.set(chartMetadata);

        res
          .header("bearer", refreshTokenJson.refresh_token)
          .status(200)
          .json({ Status: "OK" });
      } catch (error) {
        console.error(error);

        if (error.code && (error.code as string).startsWith("auth")) {
          res.status(403).json({
            code: error.code
          });
        } else {
          res.status(500).json({ code: error.code });
        }
      }
    }
  );

  return app;
}

const isFile = (filename: string) => (filePath: string) =>
  filePath.toLowerCase().indexOf(filename.toLowerCase()) !== -1;

const isChartYaml = isFile("chart.yaml");
const isReadmeMd = isFile("readme.md");

async function getChartMetadata(cloudFile: GSFile): Promise<ChartMetadata> {
  const tempDir = await makeTempDir();

  try {
    await extractGzip(cloudFile, tempDir);

    const tmpDirContents = await getAllPathsInDir(tempDir);
    const chartDirContents = await getAllPathsInDir(tmpDirContents[0]);

    const yamlFilePath = chartDirContents.find(isChartYaml);
    const readmeFilePath = chartDirContents.find(isReadmeMd);

    if (!yamlFilePath) {
      throw new Error("Could not find chart yaml in uploaded .tar.gz");
    }

    const yamlPromise = fileToString(yamlFilePath);
    const readmePromise = readmeFilePath
      ? fileToString(readmeFilePath)
      : Promise.resolve(undefined);

    const [yamlString, readMeString] = await Promise.all([
      yamlPromise,
      readmePromise
    ]);

    const [fileMetadata] = await cloudFile.getMetadata();

    return {
      chartYaml: yaml.safeLoad(yamlString),
      readme: readMeString,
      gsFilePath: fileMetadata.selfLink,
      urls: [
        fileMetadata.mediaLink.replace(
          "https://www.googleapis.com/download/storage/v1/",
          "https://firebasestorage.googleapis.com/v0/"
        )
      ]
    };
  } finally {
    await rmrf(tempDir);
  }
}

function extractGzip(fromGSFile: GSFile, toPath: string) {
  return new Promise((resolve, reject) => {
    const tarExtractor = tar.extract(toPath, {
      ignore: (name: string) => !(isChartYaml(name) || isReadmeMd(name))
    });

    fromGSFile
      .createReadStream()
      .pipe(gunzip())
      .pipe(tarExtractor)
      .on("error", e => reject(e));

    tarExtractor.on("finish", () => {
      resolve();
    });
  });
}

function fileToString(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, string) => {
      if (err) {
        reject(err);
      } else {
        resolve(string);
      }
    });
  });
}

function makeTempDir() {
  return new Promise<string>((resolve, reject) =>
    fs.mkdtemp("/tmp/helmhub", (err, dir) => {
      if (err) {
        reject(err);
      } else {
        resolve(dir);
      }
    })
  );
}

function getAllPathsInDir(dirPath: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) =>
    fs.readdir(dirPath, (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(items.map(item => path.join(dirPath, item)));
      }
    })
  );
}

function rmrf(pathToDelete: string): Promise<void> {
  return new Promise<void>((resolve, reject) =>
    rimraf(pathToDelete, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  );
}
