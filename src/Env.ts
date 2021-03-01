class Env {
  static get(key: string | string[], fallback: string = ""): any {
    let keys: string[] = typeof key === "string" ? [key] : key;

    let value: any = "";

    for (let attempt of keys) {
      if (Deno.env.get(attempt)) {
        value = Deno.env.get(attempt);
        break;
      }
    }

    try {
      value = JSON.parse(value);
    } catch (error) {
      // ignore
    }

    return value || fallback;
  }

  static getArray(key: string | string[], fallback: string = ""): string[] {
    const raw = Env.get(key);
    return raw.split(',');
  }  

  static toObject(): any {
    let values: any = {};
    let env: any = Deno.env.toObject();
    for (let key in env) {
      try {
        values[key] = JSON.parse(env[key]);
      } catch (error) {
        values[key] = env[key];
      }
    }
    return values;
  }
}

export default Env;
