const { writeTextFile } = Deno;
import { ClusterConfig } from "./config.ts";
import { jsonStringify, debug } from "./utils.ts";
import Cmd from "./Cmd.ts";

class Cluster {
  protected config: ClusterConfig;

  protected cmd: Cmd;

  constructor(config: ClusterConfig, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async authorize(): Promise<void> {
    await this.setAuthentication(this.config.serviceKey);
    await this.setCluster();
    if (this.config.namespace) {
      await this.setNamespace(this.config.namespace);
    }
  }

  async apply(path: string): Promise<void> {
    await this.cmd.run([
      "kubectl",
      "apply",
      `--filename=${path}`,
      "--recursive",
      "--record",
    ]);
  }

  private async setAuthentication(key: any): Promise<boolean> {
    const keyPath: string = await this.writeServiceKey(key);
    return await this.cmd.run([
      "gcloud",
      "auth",
      "activate-service-account",
      key.client_email,
      `--key-file=${keyPath}`,
      `--project=${key.project_id}`,
    ]);
  }

  private async setCluster(): Promise<boolean> {
    return await this.cmd.run([
      "gcloud",
      "container",
      "clusters",
      "get-credentials",
      this.config.name,
      `--zone=${this.config.zone}`,
    ]);
  }

  private async setNamespace(namespace: string): Promise<boolean> {
    return await this.cmd.run([
      "kubectl",
      "config",
      "set-context",
      "--current",
      `--namespace=${namespace}`,
    ]);
  }

  private async writeServiceKey(key: any): Promise<string> {
    const path: string = `/tmp/service-key.json`;

    const keyString: string = jsonStringify(key);

    await writeTextFile(path, keyString);

    debug({
      serviceKeyPath: path,
      serviceKey: key
    });

    return path;
  }
}

export default Cluster;
