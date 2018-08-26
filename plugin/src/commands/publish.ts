import { CommanderStatic } from "commander";
import { prompt } from "inquirer";
import firebaseAdmin from "firebase-admin";
import firebase from "firebase";
import fs from "fs";
import Configstore from "configstore";

import firebaseConfig from "../config/firebase-config";
import unfirebase from "../util/un-firebase";

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

      try {
        await unfirebase(
          firebase.auth().signInWithCustomToken(config.get("token"))
        );

        const result = await unfirebase(
          firebase
            .firestore()
            .doc("/users/1")
            .set({
              foo: "bar"
            })
				);
				
				
      } catch (e) {
        console.error(e);
      }
    });
}
