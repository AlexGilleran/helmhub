import * as express from "express";
import firebaseAdmin from "firebase-admin";

import app from "./app-router";
import api from "./api-router";
import helmRouter from "./helm-router";

var port = process.env.PORT || 3000;

const server = express();

firebaseAdmin.initializeApp();

server.use(api);
server.use(helmRouter);
server.use(app);

server.listen(port, function() {
  console.log("Server started on port", port);
});
