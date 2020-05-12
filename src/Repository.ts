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
    const { branch = "master", remote } = this.config;
    return await this.gitClone(remote, branch, path);
  }

  private async gitClone(
    remote: string,
    branch: string,
    path: string
  ): Promise<boolean> {
    return this.cmd.run([
      "git",
      "clone",
      "--single-branch",
      `--branch=${branch}`,
      "--depth=1",
      remote,
      path,
    ]);
  }
}

export default Repository;
