import { writeFileStr } from "https://deno.land/std@0.61.0/fs/mod.ts";
import { sprintf } from "https://deno.land/std@0.61.0/fmt/printf.ts";
import { join } from "https://deno.land/std@0.61.0/path/mod.ts";
import { RepositoryConfig } from "./config.ts";
import Cmd from "./Cmd.ts";

const netrcFile: string = `
machine %s
login %s
password %s
`;

class Repository {
  private config: RepositoryConfig;

  private cmd: Cmd;

  constructor(config: RepositoryConfig, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async clone(): Promise<string> {
    const { branch = "master", remote, netrc } = this.config;

    await this.writeNetrc(netrc.machine, netrc.login, netrc.password);

    return await this.gitClone(remote, branch);
  }

  private async gitClone(remote: string, branch: string): Promise<string> {
    const path: string = await Deno.makeTempDir();

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

  private async writeNetrc(
    machine: string,
    login: string,
    password: string
  ): Promise<void> {
    const netrcContent: string = sprintf(netrcFile, machine, login, password);

    const homePath: string = <string>Deno.env.get('HOME');

    const netrcPath: string = join(homePath, ".netrc");

    await writeFileStr(netrcPath, netrcContent);

    await Deno.chmod(netrcPath, 0o600);
  }
}

export default Repository;
