import { base64Decode, jsonParse } from "./utils.ts";
import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

let templates = Env.get(["GKE_TEMPLATES", "PLUGIN_TEMPLATES"]);
let repository = Env.get(["GKE_REPOSITORY", "PLUGIN_REPOSITORY"]);
let cluster = Env.get(["GKE_CLUSTER", "PLUGIN_CLUSTER"]);

let config = {
  templates,
  repository: repository ?? {
    ...repository,
    netrc: {
      machine: Env.get('DRONE_NETRC_MACHINE'),
      login: Env.get('DRONE_NETRC_USERNAME'),
      password: Env.get('DRONE_NETRC_PASSWORD')
    }
  },
  cluster: {
    ...cluster,
    serviceKey: jsonParse(base64Decode(cluster.serviceKey)),
  },
};

new Plugin(config, new Cmd()).run();
