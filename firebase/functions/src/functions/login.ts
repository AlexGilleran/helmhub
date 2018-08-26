import * as express from "express";
import * as firebase from "firebase";
import * as firebaseAdmin from "firebase-admin";

export default function login(
  config: any,
  app: express.Application = express()
) {
  app.post("/", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      // const idToken = await firebase
      //   .auth()
      //   .currentUser.getToken(true)
      //   .then(idToken => ({ idToken, user }));

      const customToken = await firebaseAdmin
        .auth()
        .createCustomToken(user.user.uid);

      res.json({
        user,
        token: customToken
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ Error: "error" });
    }
  });

  return app;
}
