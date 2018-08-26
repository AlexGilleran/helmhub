"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const package_json_1 = __importDefault(require("../package.json"));
const login_1 = __importDefault(require("./commands/login"));
commander_1.default.version(package_json_1.default.version).description("Plugin for helmhub");
login_1.default(commander_1.default);
try {
    commander_1.default.parse(process.argv);
}
catch (e) { }
//# sourceMappingURL=index.js.map