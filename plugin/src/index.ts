import program from "commander";
import packageJson from "../package.json";
import addLogin from "./commands/login";
import addPublish from "./commands/publish";
import Configstore from "configstore";

const config = new Configstore(packageJson.version, {});

program.version(packageJson.version).description("Plugin for helmhub");

addLogin(program, config);
addPublish(program, config);

program.parse(process.argv);
