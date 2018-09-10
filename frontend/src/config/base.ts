import Rebase from "re-base";
import firebase from "firebase";
import globals from "./globals";
import mockBase, { auth as mockAuth } from "./mock-base";
import firebaseConfig from "./firebase";

let auth, base;

if (globals.mock) {
  auth = mockAuth;
  base = mockBase;
} else {
  const app =
    firebase.apps.length > 0
      ? firebase.apps[0]
      : firebase.initializeApp(firebaseConfig);
  auth = app.auth();
  base = Rebase.createClass(app.database());
}

export { auth, firebase };
export default base;
