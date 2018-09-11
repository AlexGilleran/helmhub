import * as express from "express";
// import * as firebase from "firebase";
import * as firebaseAdmin from "firebase-admin";
import { fileParser } from "express-multipart-file-parser";
import fetch from "node-fetch";
import * as tar from "tar-fs";
import * as path from "path";
import * as fs from "fs";
import { File as GSFile } from "@google-cloud/storage";
import * as yaml from "js-yaml";
import * as rimraf from "rimraf";
import { encodeForFirebase } from "../util/firebase-encoding";
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
        }/${originalname}`;

        const cloudFile = bucket.file(cloudFilePath);

        await cloudFile.save(reqFile);

        const { chartYaml } = await getChartMetadata(cloudFile);

        const doc = firebaseAdmin
          .firestore()
          .collection("users")
          .doc(refreshTokenJson.user_id)
          .collection("charts")
          .doc(chartYaml.name)
          .collection("versions")
          .doc(chartYaml.version);

        doc.set({ chartYaml, path: cloudFilePath });

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

type ChartYaml = {
  apiVersion: string;
  name: string;
  version: string;
  kubeVersion?: string;
  description?: string;
  keywords?: string[];
  home?: string;
  sources?: string;
  maintainers?: {
    name: string;
    email: string;
    url: string;
  }[];
  engine?: string;
  icon?: string;
  appVersion?: string;
  deprecated?: boolean;
  tillerVersion?: string;
};

type ChartMetadata = {
  chartYaml: ChartYaml;
};

// const filesWeNeed = ["Chart.yaml", "LICENSE", "README.md", "requirements.md"];

async function getChartMetadata(cloudFile: GSFile): Promise<ChartMetadata> {
  const tempDir = await new Promise<string>((resolve, reject) =>
    fs.mkdtemp("/tmp/helmhub", (err, dir) => {
      if (err) {
        reject(err);
      } else {
        resolve(dir);
      }
    })
  );

  try {
    await new Promise((resolve, reject) => {
      const tarExtractor = tar.extract(tempDir, {
        ignore: (name: string) => {
          const lowerCaseName = name.toLowerCase();
          return lowerCaseName.indexOf("chart.yaml") === -1;
        }
      });

      cloudFile
        .createReadStream()
        .pipe(gunzip())
        .pipe(tarExtractor)
        .on("error", e => reject(e));

      tarExtractor.on("finish", () => {
        resolve();
      });
    });

    const tmpDirContents = await getAllPathsInDir(tempDir);
    const chartDirContents = await getAllPathsInDir(tmpDirContents[0]);

    const yamlFilePath = chartDirContents.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }
    })[0];

    const yamlString = await new Promise<string>((resolve, reject) => {
      fs.readFile(yamlFilePath, "utf-8", (err, string) => {
        if (err) {
          reject(err);
        } else {
          resolve(string);
        }
      });
    });

    return {
      chartYaml: yaml.safeLoad(yamlString)
    };
  } finally {
    await rmrf(tempDir);
  }
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
