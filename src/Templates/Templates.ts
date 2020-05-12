const { makeTempDir } = Deno;
import Resolver from "./Resolver.ts";
import Parser from "./Parser.ts";
import Repository from "../Repository.ts";
import Cmd from "../Cmd.ts";
import { RepositoryConfig } from "../config.ts";

class Templates {
  glob: string;

  cmd: Cmd;

  repository?: Repository;

  repositoryConfig?: RepositoryConfig;

  constructor(glob: string = "**/*.{yml,yaml}", cmd: Cmd, config?: RepositoryConfig) {
    this.glob = glob;
    this.cmd = cmd;
    if (config) {
      this.repository = new Repository(config, cmd);
    }
  }

  async parse(params?: any): Promise<string[]> {
    const tempDir: string = await makeTempDir({ prefix: "drone-gke-templates" });

    let templateRoot: string = ".";

    if (this.repository) {
      await this.repository.clone(tempDir);
      templateRoot = tempDir;
    }

    const resolver = new Resolver(this.glob, templateRoot);
    const paths: Array<string> = await resolver.resolve();

    const parser = new Parser(paths, tempDir);
    const parsedPaths: Array<string> = await parser.parse(params);

    return parsedPaths;
  }
}

export default Templates;
