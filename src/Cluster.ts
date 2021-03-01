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
    await this.setAuthentication(this.config.service_key);
    await this.setCluster();
    if (this.config.namespace) {
      await this.setNamespace(this.config.namespace);
    }
  }

  async command(cmd: string): Promise<void> {
    const parts = cmd.split(' ');
    await this.cmd.run(["kubectl", ...parts]);
  }  

  // async apply(path: string): Promise<void> {
  //   await this.cmd.run(["kubectl", "apply", `--kustomize=${path}`, "--record"]);
  // }

  async force(): Promise<void> {
    await this.cmd.run(["kubectl", "rollout", "restart", "deployments"]);
    await this.cmd.run(["kubectl", "rollout", "restart", "statefulsets"]);
  }

  private async setAuthentication(key: any): Promise<boolean> {
    const keyPath: string = await this.writeServicekey(key);
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

  private async writeServicekey(key: any): Promise<string> {
    const path: string = `/tmp/gc-service-key.json`;

    const keyString: string = jsonStringify(key);

    await writeTextFile(path, keyString);

    return path;
  }
}

export default Cluster;
