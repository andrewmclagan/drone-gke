const { Buffer, copy, readAll, writeTextFile, makeTempDir } = Deno;
import { basename } from "https://deno.land/std@0.50.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.50.0/fs/mod.ts";
import { posix } from "https://deno.land/std@0.50.0/path/mod.ts";
import { renderFile } from "https://deno.land/x/dejs@0.4.0/mod.ts";
import { debug } from "../utils.ts";

class Parser {
  paths: string[] = [];

  decoder: TextDecoder;

  constructor(paths: string[]) {
    this.paths = paths;
    this.decoder = new TextDecoder("utf-8");
  }

  async parse(params: any = {}): Promise<string> {
    const destDir: string = await makeTempDir();

    for (let i = 0; i < this.paths.length; i++) {
      if (await exists(this.paths[i])) {
        debug(this.paths[i]);
        const content = await this.renderFile(this.paths[i], params);
        const getNewPath = await this.getNewPath(destDir, this.paths[i]);
        await writeTextFile(getNewPath, content);
      }
    }

    return new Promise((resolve) => resolve(destDir));
  }

  private async renderFile(path: string, params: any): Promise<string> {
    let buf = new Buffer();
    let output = await renderFile(path, params);
    await copy(output, buf);
    let bytes = await readAll(buf);
    return this.decoder.decode(bytes);
  }

  private async getNewPath(dir: string, path: string): Promise<string> {
    const ext: string = posix.extname(path);
    const name: string = basename(path);
    return `${dir}/${name}${ext}`;
  }
}

export default Parser;
