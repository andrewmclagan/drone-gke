const { env } = Deno;
import { Config } from "./config.ts";
import { base64Decode, jsonParse } from "./utils.ts";
import Env from "./Env.ts";
import Templates from "./Templates/Templates.ts";
import Cluster from "./Cluster.ts";

class Plugin {
  protected config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async run(): Promise<void> {
    const templates = new Templates(
      this.config.templates,
      this.config.repository
    );

    const cluster = new Cluster(this.config.cluster);

    const params: any = env.toObject();
    const templatePaths: Array<string> = await templates.parse(params);

    await cluster.authorize();
    await cluster.apply(templatePaths);
  }

  static getEnvConfig(): Config {
    let templates = Env.get(["GKE_TEMPLATES", "PLUGIN_TEMPLATES"]);
    let repository = Env.getJson(["GKE_REPOSITORY","PLUGIN_REPOSITORY"]);
    let cluster = Env.getJson(["GKE_CLUSTER","PLUGIN_CLUSTER"]);
    return {
      templates,
      repository,
      cluster: {
        ...cluster,
        serviceKey: jsonParse(base64Decode(cluster.service_key)),
      },
    };
  }
}

export default Plugin;
