import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import * as firebase from "firebase";
import * as express from "express";

import login from "./functions/login";

const config = functions.config().firebase || {
  apiKey: "AIzaSyBT-5Y2tN8Z-3Kej12RxbqPd3ThyLvYAw8",
  authDomain: "helmhub-dev.firebaseapp.com",
  databaseURL: "https://helmhub-dev.firebaseio.com",
  projectId: "helmhub-dev",
  storageBucket: "helmhub-dev.appspot.com",
  messagingSenderId: "436272688363"
};

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

// function buildAuthExpress() {
//   const app = express();
//   setupAuth(app);
//   return app;
// }
