"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    dev: {
        apiKey: "AIzaSyBT-5Y2tN8Z-3Kej12RxbqPd3ThyLvYAw8",
        authDomain: "helmhub-dev.firebaseapp.com",
        databaseURL: "https://helmhub-dev.firebaseio.com",
        projectId: "helmhub-dev",
        storageBucket: "helmhub-dev.appspot.com",
        messagingSenderId: "436272688363"
    },
    prod: {}
};
const environment = process.env.ENVIRONMENT || "dev";
exports.default = config[environment];
//# sourceMappingURL=firebase-config.js.map