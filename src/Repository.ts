const { chmod, makeTempDir } = Deno;
import { writeFileStr } from "https://deno.land/std/fs/mod.ts";
import { RepositoryConfig } from "./config.ts";
import Cmd from "./Cmd.ts";

class Repository {
  private config: RepositoryConfig;

  private cmd: Cmd;

  constructor(config: RepositoryConfig, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async clone(path: string): Promise<boolean> {
    const { branch = "master", remote, sshKey } = this.config;
    let keyPath: string = "";
    if (sshKey) {
      keyPath = await this.writeSshKey(sshKey);
    }
    return await this.gitClone(remote, branch, path, keyPath);
  }

  private async gitClone(
    remote: string,
    branch: string,
    path: string,
    keyPath?: string
  ): Promise<boolean> {
    const command: string[] = [
      "git",
      "clone",
      "--single-branch",
      `--branch=${branch}`,
      "--depth=1",
      remote,
      path,
    ];
    if (keyPath) {
      command.splice(1, 0, `-c core.sshCommand="ssh -i ${keyPath}"`);
    }
    return await this.cmd.run(command);
  }

  private async writeSshKey(key: string): Promise<string> {
    const tempDir: string = await makeTempDir({ prefix: "drone-gke-key" });
    const path: string = `${tempDir}/gke_id_rsa`;
    await writeFileStr(path, key);
    await chmod(path, 0o600);
    return path;
  }
}

export default Repository;
