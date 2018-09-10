const env = require("./environment");

const devConfig = {
  apiKey: "AIzaSyAcnhYbWiIQc8leflW5AET5tWqsoPx2_OA",
  authDomain: "nichetester-dev.firebaseapp.com",
  databaseURL: "https://nichetester-dev.firebaseio.com",
  projectId: "nichetester-dev",
  storageBucket: "",
  messagingSenderId: "353532549625"
};

const prodConfig = {};

const config = env === "prod" ? prodConfig : devConfig;

module.exports = config;
