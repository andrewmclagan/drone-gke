import { base64Decode, jsonParse } from "./utils.ts";
import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

let glob = Env.get(["GKE_GLOB", "PLUGIN_GLOB"]);
let cluster = Env.get(["GKE_CLUSTER", "PLUGIN_CLUSTER"]);

let config = {
  glob,
  repository: undefined,
  cluster: {
    ...cluster,
    serviceKey: jsonParse(base64Decode(cluster.serviceKey)),
  },
};

let repository = Env.get(["GKE_REPOSITORY", "PLUGIN_REPOSITORY"]);

if (repository) {
  config.repository = {
    ...repository,
    netrc: {
      machine: Env.get("DRONE_NETRC_MACHINE"),
      login: Env.get("DRONE_NETRC_USERNAME"),
      password: Env.get("DRONE_NETRC_PASSWORD"),
    },
  };
}

new Plugin(config, new Cmd()).run();
