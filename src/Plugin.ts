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
    const glob: string = this.config.templates || "**/*.{yml,yaml}";
    const templates = new Templates(glob, this.config.repository);

    const cluster = new Cluster(this.config.cluster);

    const params: any = env.toObject();
    const templatePaths: Array<string> = await templates.parse(params);

    await cluster.authorize();
    await cluster.apply(templatePaths);
  }

  static getEnvConfig(): Config {
    let cluster = Env.getJson("CLUSTER");
    let repository = Env.getJson("REPOSITORY");
    return {
      templates: Env.get("TEMPLATES"),
      repository: {
        remote: repository.remote,
        branch: repository.branch || "master",
      },
      cluster: {
        name: cluster.name,
        zone: cluster.zone,
        namespace: cluster.namespace || "",
        serviceKey: jsonParse(base64Decode(cluster.service_key)),
      },
    };
  }
}

export default Plugin;
