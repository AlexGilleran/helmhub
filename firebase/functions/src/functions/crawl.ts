import fetch from "node-fetch";
import * as express from "express";
import * as yaml from "js-yaml";

import updateChart from "../database/updateChart";

export default function login(app: express.Application = express()) {
  app.post("/", async (req, res) => {
    const stableText = await fetch(
      "https://kubernetes-charts.storage.googleapis.com/index.yaml"
    ).then(x => x.text());

    const stable = yaml.load(stableText);

    for (const entryKey of Object.keys(stable.entries) as any[]) {
      console.log("Updating " + entryKey);

      const entry = stable.entries[entryKey];
      for (const version of entry) {
        await updateChart("stable", {
          chartYaml: version,
          urls: version.urls
        });
      }
    }

    res.status(200).send("Done");
  });

  return app;
}
