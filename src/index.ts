import { base64Decode, jsonParse, debug } from "./utils.ts";
import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

let kustomize = Env.get(["GKE_KUSTOMIZE", "PLUGIN_KUSTOMIZE"]);
let cluster = Env.get(["GKE_CLUSTER", "PLUGIN_CLUSTER"]);
let serviceKey = Env.get(["GKE_SERVICE_KEY", "PLUGIN_SERVICE_KEY"]);

let config = {
  kustomize,
  cluster: {
    ...cluster,
    service_key: jsonParse(base64Decode(serviceKey)),
  },
};

new Plugin(config, new Cmd()).run();
