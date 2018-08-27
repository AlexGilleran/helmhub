import * as express from "express";
import * as firebase from "firebase";
import * as firebaseAdmin from "firebase-admin";
import { fileParser } from "express-multipart-file-parser";

export default function login(
  config: any,
  app: express.Application = express()
) {
  app.post(
    "/",
    fileParser({
      rawBodyOptions: {
        limit: "10mb"
      }
    }),
    async (req, res) => {
      try {
        const token = req.header("bearer");

        const verificationResult = await firebaseAdmin
          .auth()
          .verifyIdToken(token, true);

        const user = await firebaseAdmin.auth().getUser(verificationResult.uid);

        const files = (req as any).files;

        if (!files || files.length === 0) {
          res.status(400).send("No files were uploaded.");
          console.warn("No files were uploaded");
          return;
        }

        const bucket = firebaseAdmin.storage().bucket();

        const cloudFile = bucket.file("alex/blah.tgz");
        const reqFile = files["0"].buffer as Buffer;

        await cloudFile.save(reqFile);

        res.status(200).json({ Status: "OK" });
      } catch (error) {
        console.error(error);

        if ((error.code as string).startsWith("auth")) {
          res.status(403).json({
            code: error.code
          });
        } else {
          res.status(500).json({ code: error.code });
        }
      }
    }
  );

  return app;
}
