const { chmod, mkdir, makeTempDir } = Deno;
import { exists, writeFileStr } from "https://deno.land/std@0.50.0/fs/mod.ts";
import { RepositoryConfig } from "./config.ts";
import Cmd from "./Cmd.ts";

class Repository {
  private config: RepositoryConfig;

  private cmd: Cmd;

  constructor(config: RepositoryConfig, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async clone(): Promise<string> {
    const { branch = "master", remote, privateKey } = this.config;
    if (privateKey) {
      await this.writeKeyFile(privateKey);
    }
    return await this.gitClone(remote, branch);
  }

  private async gitClone(remote: string, branch: string): Promise<string> {
    const path: string = await makeTempDir();
    await this.cmd.run([
      "git",
      "clone",
      "--single-branch",
      `--branch=${branch}`,
      "--depth=1",
      remote,
      path,
    ]);
    return path;
  }

  private async writeKeyFile(keyString: string): Promise<void> {
    const home = await Deno.dir('home');
    const keyDir: string = `${home}/.ssh`;
    const keyPath: string = `${keyDir}/id_rsa`;
    const keyConfigPath: string = `${keyDir}/config`;

    if (await exists(keyDir) === false) {
      await mkdir(keyDir, { mode: 0o700, recursive: true });
    }

    if (await exists(keyPath) === false) {
      await writeFileStr(keyPath, keyString);
      await chmod(keyPath, 0o600);
    }    

    if (await exists(keyConfigPath) === false) {
      await writeFileStr(keyConfigPath, "StrictHostKeyChecking no\n");
      await chmod(keyConfigPath, 0o700);
    }
  }
}

export default Repository;
