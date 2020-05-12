import { walk } from "https://deno.land/std/fs/mod.ts";
import { globToRegExp } from "https://deno.land/std/path/mod.ts";

class Resolver {
  private glob: string;

  private root: string;

  constructor(glob: string, root: string = ".") {
    this.glob = glob;
    this.root = root;
  }

  async resolve(): Promise<string[]> {
    return await this.getPaths();
  }

  private async getPaths(): Promise<string[]> {
    let paths: Array<string> = [];
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
