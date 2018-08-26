"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const firebase_auth_1 = __importDefault(require("../external/firebase-auth"));
const firebase_config_1 = __importDefault(require("../config/firebase-config"));
const loginQuestions = [
    {
        type: "input",
        name: "email",
        message: "Enter your email address"
    },
    {
        type: "password",
        name: "password",
        message: "Enter your password"
    }
];
const firebaseAuth = new firebase_auth_1.default(firebase_config_1.default);
function addLogin(program) {
    try {
        program
            .command("login")
            .alias("l")
            .description("Login to HelmHub")
            .action(() => {
            console.info("Logging into HelmHub...");
            inquirer_1.prompt(loginQuestions)
                .then(({ email, password }) => firebaseAuth.signIn(email, password))
                .then(({ idToken, user }) => {
                console.log("Your id token is " +
                    idToken +
                    " and you are " +
                    JSON.stringify(user));
            })
                .catch(e => {
                console.error("Failed to log in: " + e.message);
            })
                .then(() => {
                return new Promise((resolve, reject) => setTimeout(resolve, 45000));
            });
        });
    }
    catch (e) { }
}
exports.default = addLogin;
//# sourceMappingURL=login.js.map