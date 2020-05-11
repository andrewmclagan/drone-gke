export function base64Decode(value: string): string {
  try {
    return atob(value);
  } catch (error) {
    return "";
  }
}

export function jsonParse(value: string): object {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}

export function jsonStringify(value: any): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return '';
  }
}

export async function run(cmd: Array<string>): Promise<boolean> {
  const process = Deno.run({ cmd: cmd });
  const status = await process.status();
  process.close();
  return status.success;
}
