const { env } = Deno;
import { Config } from "./config.ts";
import Cmd from "./Cmd.ts";
import Templates from "./Templates/Templates.ts";
import Cluster from "./Cluster.ts";

class Plugin {
  protected config: Config;

  protected cmd: Cmd;

  constructor(config: Config, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async run(): Promise<void> {
    const { templates: glob, repository: repoConfig, cluster: clusterConfig } = this.config;

    const templates = new Templates(glob, this.cmd, repoConfig);

    const cluster = new Cluster(clusterConfig, this.cmd);

    const params: any = env.toObject();
    const templatePaths: Array<string> = await templates.parse(params);

    await cluster.authorize();
    await cluster.apply(templatePaths);
  }
}

export default Plugin;
