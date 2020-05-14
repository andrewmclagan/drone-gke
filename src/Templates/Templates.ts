import Resolver from "./Resolver.ts";
import Parser from "./Parser.ts";
import { log } from "../utils.ts";

class Templates {
  glob: string;

  root: string;

  constructor(root: string = ".", glob: string = "**/*.{yml,yaml}") {
    this.root = root;
    this.glob = glob;
  }

  async parse(params?: any): Promise<string> {
    const paths: string[] = await new Resolver(this.root, this.glob).resolve();

    log(`Matched ${paths.length} templates in ${this.root}/${this.glob}`);

    const definitionRoot: string = await new Parser(paths).parse(params);

    return definitionRoot;
  }
}

export default Templates;
