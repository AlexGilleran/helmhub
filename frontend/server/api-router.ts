import * as express from "express";

import { getChart } from "./database";

const router = express.Router();

router.get("/api/v0/charts/:username/:chartName", async (req, res) => {
  const data = await getChart(req.params.username, req.params.chartName);

  res.json({ ...data, username: req.params.username });
});

export default router;
