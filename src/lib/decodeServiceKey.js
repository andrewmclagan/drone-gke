import { Base64 } from "js-base64";

export default function decodeServiceKey(key) {
  return JSON.parse(Base64.decode(key));
}
