import { CommanderStatic } from "commander";
import { prompt } from "inquirer";
import firebaseAdmin from "firebase-admin";
import firebase from "firebase";
import fs from "fs";
import Configstore from "configstore";
import rimraf from "rimraf";

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
        //   firebase.auth().signInWithCustomToken(config.get("token"))
        // );

        const packageResult = spawnSync(
          "helm",
          ["package", ".", "-d", tempDir],
          {
            stdio: "inherit"
          }
        );

        console.log(packageResult.error);

        const tgz = fs.readdirSync(tempDir)[0];

        console.log(tgz);
      } catch (e) {
        console.error(e);
      } finally {
        rimraf.sync(tempDir);
      }
    });
}
