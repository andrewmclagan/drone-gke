import { Config } from "./config.ts";
import Cmd from "./Cmd.ts";
import Env from "./Env.ts";
import Cluster from "./Cluster.ts";
import { debug } from "./utils.ts";

class Plugin {
  protected config: Config;

  protected cmd: Cmd;

  constructor(config: Config, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async run(): Promise<void> {
    debug(this.config);

    const { kustomize, force, cluster: clusterConfig } = this.config;

    const cluster: Cluster = new Cluster(clusterConfig, this.cmd);

    await cluster.authorize();

    await cluster.apply(kustomize);

    if (force) {
      await cluster.force();
    }
  }
}

export default Plugin;
