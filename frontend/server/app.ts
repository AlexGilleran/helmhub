import * as next from 'next'
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const prepare = app.prepare();

export default (req, res) => {
  return prepare
    .then(() => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .catch(e => console.error(e));
};
