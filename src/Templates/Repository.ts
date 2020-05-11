const { run } = Deno;
import { RepositoryConfig } from "../config.ts";

class Repository {
  private config: RepositoryConfig;

  constructor(config: RepositoryConfig) {
    this.config = config;
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
    const process = run({
      cmd: [
        "git",
        "clone",
        "--single-branch",
        `--branch=${branch}`,
        "--depth=1",
        remote,
        path,
      ],
    });
    const status = await process.status();
    process.close();
    return status.success;
  }
}

export default Repository;
