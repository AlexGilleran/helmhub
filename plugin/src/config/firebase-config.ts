const config: { [key: string]: Object } = {
  dev: {
    apiKey: "AIzaSyBT-5Y2tN8Z-3Kej12RxbqPd3ThyLvYAw8",
    authDomain: "helmhub-dev.firebaseapp.com",
    databaseURL: "https://helmhub-dev.firebaseio.com",
    projectId: "helmhub-dev",
    storageBucket: "helmhub-dev.appspot.com",
    messagingSenderId: "436272688363"
  } as Object,
  prod: {} as Object
};

const environment = process.env.ENVIRONMENT || "dev";

export default config[environment];
