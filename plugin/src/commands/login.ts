import { CommanderStatic } from "commander";
import { prompt } from "inquirer";
import firebaseAdmin from "firebase-admin";
import firebase from "firebase";
import fs from "fs";
import Configstore from "configstore";
import fetch from "node-fetch";

import FirebaseAuth from "../external/firebase-auth";
import firebaseConfig from "../config/firebase-config";
import unfirebase from "../util/un-firebase";

// firebaseAdmin.initializeApp({
//   serviceAccountId:
//     "firebase-adminsdk-klfga@helmhub-dev.iam.gserviceaccount.com",
//   databaseURL: "https://helmhub-dev.firebaseio.com"
// });

const loginQuestions = [
  {
    type: "input",
    name: "email",
    message: "Enter your email address"
  },
  {
    type: "password",
    name: "password",
    message: "Enter your password"
  }
];

const firebaseAuth = new FirebaseAuth(firebaseConfig);

export default function addLogin(
  program: CommanderStatic,
  config: Configstore
) {
  program
    .command("login")
    .alias("l")
    .description("Login to HelmHub")
    .action(async () => {
      console.info("Logging into HelmHub...");

      try {
        const { email, password } = (await prompt(loginQuestions)) as {
          email: string;
          password: string;
        };

        const response = await fetch(
          "http://localhost:5000/helmhub-dev/us-central1/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const responseJson = await response.json();

        if (response.status !== 200) {
          console.log(`Failed to login: ${responseJson.error}`);
        }

        const token = responseJson.refreshToken;

        // const result = await unfirebase(
        //   firebase.auth().signInWithEmailAndPassword(email, password)
        // );

        // const idToken = await unfirebase(result.user.getIdToken());

        config.set("token", token);
      } catch (e) {
        console.error(e);
      }
    });
}
