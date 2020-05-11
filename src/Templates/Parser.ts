const { Buffer, copy, readAll } = Deno;
import { basename } from "https://deno.land/std/path/mod.ts";
import { exists, writeFileStr } from "https://deno.land/std/fs/mod.ts";
import { posix } from "https://deno.land/std/path/mod.ts";
import { v4 as uuid } from "https://deno.land/std/uuid/mod.ts";
import { renderFile } from "https://deno.land/x/dejs@0.4.0/mod.ts";

class Parser {
  paths: Array<string> = [];

  root: string;

  decoder: TextDecoder;

  constructor(paths: Array<string>, root: string) {
    this.paths = paths;
    this.root = root;
    this.decoder = new TextDecoder("utf-8");
  }

  async parse(params: any = {}): Promise<string[]> {
    let newPaths: Array<string> = [];
    for (let i = 0; i < this.paths.length; i++) {
      if (await exists(this.paths[i])) {
        const content = await this.renderFile(this.paths[i], params);
        const getNewPath = await this.getNewPath(this.paths[i]);
        await this.writeFile(getNewPath, content);
        newPaths.push(getNewPath);
      }
    }
    return new Promise((resolve) => resolve(newPaths));
  }

  private async renderFile(path: string, params: any): Promise<string> {
    let buf = new Buffer();
    let output = await renderFile(path, params);
    await copy(output, buf);
    let bytes = await readAll(buf);
    return this.decoder.decode(bytes);
  }

  private async getNewPath(path: string): Promise<string> {
    const id: string = uuid.generate();
    const ext: string = posix.extname(path);
    const name: string = basename(path);
    return `${this.root}/${name}.${id}${ext}`;
  }

  private async writeFile(path: string, content: string): Promise<void> {
    await writeFileStr(path, content);
  }
}

export default Parser;
