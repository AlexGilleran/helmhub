import { CommanderStatic } from "commander";
import { prompt } from "inquirer";
import firebaseAdmin from "firebase-admin";
import firebase from "firebase";
import fs from "fs";
import path from "path";
import Configstore from "configstore";
import rimraf from "rimraf";
import fetch from "node-fetch";
import FormData from "form-data";

import firebaseConfig from "../config/firebase-config";
import unfirebase from "../util/un-firebase";
import { spawnSync } from "child_process";

export default function addLogin(
  program: CommanderStatic,
  config: Configstore
) {
  program
    .command("publish")
    .alias("p")
    .description("Publish chart to helmhub")
    .action(async () => {
      console.info("Publishing");
      const tempDir = fs.mkdtempSync("helmhub");

      try {
        // const credential = await unfirebase(
        // 	firebase.auth().signInWithCustomToken(config.get("token"))
        // );

        // firebase.auth().signIn
        console.log(config.get("token"));

        const packageResult = spawnSync(
          "helm",
          ["package", ".", "-d", tempDir],
          {
            stdio: "inherit"
          }
        );

        const tgz = path.join(tempDir, fs.readdirSync(tempDir)[0]);

        const stats = fs.statSync(tgz);
        const tgzStream = fs.createReadStream(tgz);

        const formData = new FormData();
        formData.append(tgz, tgzStream);

        const res = await fetch(
          "http://localhost:5000/helmhub-dev/us-central1/publish",
          {
            headers: {
              bearer: config.get("token")
            },
            method: "POST",
            body: formData
          }
        );

        if (
          res.status === 403 &&
          (await res.json()).code === "auth/argument-error"
        ) {
          console.error(
            "Your id token has been revoked, please run helm hub login again"
          );
          return;
        } else if (res.status !== 200) {
          throw new Error(res.statusText);
        }

        const resJson = await res.json();

        config.set("token", res.headers.get("bearer"));

        console.log("Successfully uploaded " + tgz);
      } catch (e) {
        console.error(e);
      } finally {
        rimraf.sync(tempDir);
      }
    });
}
