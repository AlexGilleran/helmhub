import * as express from "express";
import * as yaml from "js-yaml";
import firebaseAdmin from "firebase-admin";
import { mapValues, values, flatten, reduce, merge } from "lodash";

import { getCharts, getUser, getChartsByUserId } from "./database";
import firebaseConfig from "../src/config/firebase";

const router = express.Router();

router.get("/charts/:username/index.yaml", async (req, res) => {
  const user = await getUser(req.params.username);
  const uid = user.docs[0].get("uid");
  const charts = await getChartsByUserId(uid);

  const promiseMap = mapValues(
    charts,
    async chart =>
      await mapValues(chart, async version => {
        const [fileMetadata] = await firebaseAdmin
          .storage()
          .bucket(firebaseConfig.storageBucket)
          .file(`/users/${uid}/charts/${version.name}-${version.version}.tgz`)
          .getMetadata();

        return {
          [version.name]: [
            {
              apiVersion: "v1",
              name: version.name,
              version: version.version,
              description: version.description,
              home: version.home,
              sources: version.sources,
              urls: [
                fileMetadata.mediaLink.replace(
                  "https://www.googleapis.com/download/storage/v1/",
                  "https://firebasestorage.googleapis.com/v0/"
                )
              ]
            }
          ]
        };
      })
  );

  const x = await Promise.all(values(promiseMap));
  const y = await Promise.all(x.map(blah => Promise.all(values(blah))));
  const array = flatten(y);
  const object = reduce(array, merge, {});

  const responseObj = {
    apiVersion: "v1",
    entries: object
  };

  res
    .contentType("application/yaml")
    .status(200)
    .send(yaml.safeDump(responseObj));
});

export default router;
