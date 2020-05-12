import { base64Decode, jsonParse } from "./utils.ts";
import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

let templates = Env.get(["GKE_TEMPLATES", "PLUGIN_TEMPLATES"]);
let repository = Env.getJson(["GKE_REPOSITORY", "PLUGIN_REPOSITORY"]);
let cluster = Env.getJson(["GKE_CLUSTER", "PLUGIN_CLUSTER"]);

let config = {
  templates,
  repository,
  cluster: {
    ...cluster,
    serviceKey: jsonParse(base64Decode(cluster.service_key)),
  },
};

new Plugin(config, new Cmd).run();
