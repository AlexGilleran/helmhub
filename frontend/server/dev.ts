import * as express from "express";
import app from "./app";

var port = process.env.PORT || 3000;

const server = express();

server.get("*", (req, res) => app(req, res));

server.listen(port, function() {
  console.log("Server started on port", port);
});
