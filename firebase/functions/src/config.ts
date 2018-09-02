import * as functions from "firebase-functions";

const config: {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
} = functions.config().firebase || {
  apiKey: "AIzaSyBT-5Y2tN8Z-3Kej12RxbqPd3ThyLvYAw8",
  authDomain: "helmhub-dev.firebaseapp.com",
  databaseURL: "https://helmhub-dev.firebaseio.com",
  projectId: "helmhub-dev",
  storageBucket: "helmhub-dev.appspot.com",
  messagingSenderId: "436272688363"
};

export default config;
