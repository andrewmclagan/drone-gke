import { walk } from "https://deno.land/std@0.50.0/fs/mod.ts";
import { globToRegExp } from "https://deno.land/std@0.50.0/path/mod.ts";

class Resolver {
  private root: string;

  private glob: string;

  constructor(root: string, glob: string) {
    this.root = root;
    this.glob = glob;
  }

  async resolve(): Promise<string[]> {
    return await this.getPaths();
  }

  private async getPaths(): Promise<string[]> {
    let paths: string[] = [];
    let files = walk(this.root, { match: [this.getRegEx()] });
    for await (const entry of files) {
      paths.push(entry.path);
    }
    return paths;
  }

  private getRegEx(): RegExp {
    return globToRegExp(this.glob, {
      extended: true,
    });
  }
}

export default Resolver;
