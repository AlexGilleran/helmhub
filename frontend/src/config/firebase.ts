const env = require("./environment");

const devConfig = {
  apiKey: "AIzaSyBT-5Y2tN8Z-3Kej12RxbqPd3ThyLvYAw8",
  authDomain: "helmhub-dev.firebaseapp.com",
  databaseURL: "https://helmhub-dev.firebaseio.com",
  projectId: "helmhub-dev",
  storageBucket: "helmhub-dev.appspot.com",
  messagingSenderId: "436272688363"
};

// const prodConfig = {};

// const config = env === "prod" ? prodConfig : devConfig;

const config = devConfig;

export default config;
