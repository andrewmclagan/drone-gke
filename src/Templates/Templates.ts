const { makeTempDir } = Deno;
import Resolver from "./Resolver.ts";
import Parser from "./Parser.ts";
import Repository from "./Repository.ts";
import { RepositoryConfig } from "../config.ts";

class Templates {
  glob: string;

  repository?: Repository;

  repositoryConfig?: RepositoryConfig;

  constructor(glob: string = "**/*.{yml,yaml}", config?: RepositoryConfig) {
    this.glob = glob;

    if (config) {
      this.repository = new Repository(config);
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