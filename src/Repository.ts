const { chmod, mkdir, makeTempDir } = Deno;
import { writeFileStr } from "https://deno.land/std@0.50.0/fs/mod.ts";
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
    const keyPath: string = "/root/.ssh";
    await mkdir(keyPath, { mode: 0o700, recursive: true });

    await writeFileStr(`${keyPath}/id_rsa`, keyString);
    await chmod(`${keyPath}/id_rsa`, 0o600);

    await writeFileStr(`${keyPath}/config`, "StrictHostKeyChecking no\n");
    await chmod(`${keyPath}/config`, 0o700);
  }
}

export default Repository;
