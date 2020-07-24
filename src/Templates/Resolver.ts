import { walk } from "https://deno.land/std@0.61.0/fs/mod.ts";
import { globToRegExp } from "https://deno.land/std@0.61.0/path/mod.ts";

class Resolver {
  private root: string;

  private glob: string;

  constructor(root: string, glob: string) {
    this.root = root;
    this.glob = glob;
  }

  async resolve(): Promise<string[]> {
    let paths: string[] = [];

    const pattern: RegExp = globToRegExp(this.glob, {
      extended: true,
    });

    let files = walk(this.root, {
      match: [pattern],
    });

    for await (const entry of files) {
      paths.push(entry.path);
    }

    return paths;
  }
}

export default Resolver;
