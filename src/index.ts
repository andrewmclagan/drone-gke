import { base64Decode, jsonParse, debug } from "./utils.ts";
import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

let commands = Env.getArray(["GKE_COMMANDS", "PLUGIN_COMMANDS"]);
let force = Env.get(["GKE_FORCE", "PLUGIN_FORCE"]);
let cluster = Env.get(["GKE_CLUSTER", "PLUGIN_CLUSTER"]);
let serviceKey = Env.get(["GKE_SERVICE_KEY", "PLUGIN_SERVICE_KEY"]);

let config = {
  commands,
  force,
  cluster: {
    ...cluster,
    service_key: jsonParse(base64Decode(serviceKey)),
  },
};

new Plugin(config, new Cmd()).run();
