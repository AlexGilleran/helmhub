import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import * as firebase from "firebase";
import * as express from "express";

import config from "./config";
import login from "./functions/login";
import publish from "./functions/publish";

firebase.initializeApp(config);
firebaseAdmin.initializeApp(config);

// const setupAuth = require("./src/auth");

exports.addUserToDatabase = functions.auth.user().onCreate(event => {
  const user = event;
  const userData = firebaseAdmin.database().ref(`/users/${user.uid}`);

  return userData.set(user).catch(e => {
    console.error(e);
    throw e;
  });
});

exports.deleteUserFromDatabase = functions.auth.user().onDelete(event => {
  const user = event;

  return firebaseAdmin
    .database()
    .ref(`/users/${user.uid}`)
    .remove()
    .catch(e => {
      console.error(e);
      throw e;
    });
});
exports.login = functions.https.onRequest(login(config, express()));
exports.publish = functions.https.onRequest(publish(config, express()));

// function buildAuthExpress() {
//   const app = express();
//   setupAuth(app);
//   return app;
// }
