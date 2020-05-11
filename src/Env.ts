import { jsonParse } from "./utils.ts";

class Env {
  static get(key: string | Array<string>, fallback: string = ""): string {
    let keys: Array<string> = typeof key === "string" ? [key] : key;

    let value: string | undefined = "";

    for (let attempt of keys) {
      if (Deno.env.get(attempt)) {
        value = Deno.env.get(attempt);
        break;
      }
    }

    return value || fallback;
  }

  static getJson(key: string | Array<string>): any {
    let value = Env.get(key);
    return value ? jsonParse(value) : {};
  }
}

export default Env;
