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
    return "";
  }
}
