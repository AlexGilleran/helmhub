import * as express from "express";
import firebaseAdmin from "firebase-admin";
import app from "./app";

var port = process.env.PORT || 3000;

const server = express();

firebaseAdmin.initializeApp();

server.get("/charts/:username/:chartName", async (req, res) => {
  const user = await firebaseAdmin
    .firestore()
    .collection("users")
    .where("username", "==", req.params.username)
    .limit(1)
    .select("uid")
    .get();

  const uid = user.docs[0].get("uid");

  const versions = await firebaseAdmin
    .firestore()
    .collection(`/users/${uid}/charts/${req.params.chartName}/versions`)
    .orderBy("chartYaml.version", "desc")
    .limit(1)
    .get();

  const version = versions.docs[0].data();

  res.json(version);
});

server.get("*", (req, res) => app(req, res));

server.listen(port, function() {
  console.log("Server started on port", port);
});
