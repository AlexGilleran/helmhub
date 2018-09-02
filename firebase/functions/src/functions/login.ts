import * as express from "express";
import * as firebase from "firebase";
import * as firebaseAdmin from "firebase-admin";
import fetch from "node-fetch";

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

      const idAndRefreshTokenResponse = await fetch(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${
          config.apiKey
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: customToken,
            returnSecureToken: true
          })
        }
      );

      if (idAndRefreshTokenResponse.status !== 200) {
        const errorObj = await idAndRefreshTokenResponse.json();
        res.status(403).json({
          code: errorObj.code
        });
        console.log(
          `Failed to get id and refresh token with status ${
            errorObj.code
          } and error object ${JSON.stringify(errorObj)}`
        );
        return;
      }

      const {
        // idToken,
        refreshToken
      }: {
        idToken: string;
        refreshToken: string;
      } = await idAndRefreshTokenResponse.json();

      res.json({
        refreshToken
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ Error: "error" });
    }
  });

  return app;
}
