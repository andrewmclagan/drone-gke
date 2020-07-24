import { Config } from "./config.ts";
import Cmd from "./Cmd.ts";
import Env from "./Env.ts";
import Templates from "./Templates/Templates.ts";
import Repository from "./Repository.ts";
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

    const { cluster: clusterConfig } = this.config;

    const templateRoot: string = await this.parseTemplates();

    const cluster: Cluster = new Cluster(clusterConfig, this.cmd);

    await cluster.authorize();

    await cluster.apply(templateRoot);
  }

  private async parseTemplates(): Promise<string> {
    const { glob, repository: repoConfig } = this.config;

    const params: any = Env.toObject();

    let templateRoot: string = ".";

    if (repoConfig) {
      templateRoot = await new Repository(repoConfig, this.cmd).clone();
    }

    return await new Templates(templateRoot, glob).parse(params);
  }
}

export default Plugin;
