const { makeTempDir } = Deno;
import { writeFileStr } from "https://deno.land/std/fs/mod.ts";
import { ClusterConfig } from "./config.ts";
import { run, jsonStringify } from "./utils.ts";

class Cluster {
  protected config: ClusterConfig;

  constructor(config: ClusterConfig) {
    this.config = config;
  }

  async authorize(): Promise<void> {
    await this.setAuthentication(this.config.serviceKey);
    await this.setCluster();
    if (this.config.namespace) {
      await this.setNamespace(this.config.namespace);
    }
  }

  async apply(templates: Array<string>): Promise<void> {
    for (let i = 0; i < templates.length; i++) {
      await run(["kubectl", "apply", `-f ${templates[i]}`, "--record"]);
    }
  }

  private async setAuthentication(key: any): Promise<boolean> {
    const keyPath = await this.writeServiceKey(key);
    return await run([
      "gcloud",
      "auth",
      "activate-service-account",
      key.client_email,
      `--key-file=${keyPath}`,
      `--project=${key.project_id}`,
    ]);
  }

  private async setCluster(): Promise<boolean> {
    return await run([
      "gcloud",
      "container",
      "clusters",
      "get-credentials",
      this.config.name,
      `--zone=${this.config.zone}`,
    ]);
  }

  private async setNamespace(namespace: string): Promise<boolean> {
    return await run([
      "kubectl",
      "config",
      "set-context",
      "--current",
      `--namespace ${namespace}`,
    ]);
  }

  private async writeServiceKey(key: any): Promise<string> {
    const tempDir: string = await makeTempDir({ prefix: "drone-gke-key" });
    const path: string = `${tempDir}/service-key.json`;
    const keyString: string = jsonStringify(key);
    await writeFileStr(path, keyString);
    return path;
  }
}

export default Cluster;
