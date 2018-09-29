import * as next from "next";
import { parse } from "url";
import { Router } from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const prepare = app.prepare();

const appRouter = Router();

appRouter.use(async (req, res, next) => {
  await prepare;
  next();
});

appRouter.get("/charts/:username/:chartName", async (req, res) => {
  const parsedUrl = parse(
    `/chart?username=${req.params.username}&chart=${req.params.chartName}`,
    true
  );
  handle(req, res, parsedUrl);
});

appRouter.all("*", async (req, res) => {
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
});

export default appRouter;
