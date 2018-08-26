import program from "commander";
import packageJson from "../package.json";
import addLogin from "./commands/login";

program.version(packageJson.version).description("Plugin for helmhub");

addLogin(program);

program.parse(process.argv);
