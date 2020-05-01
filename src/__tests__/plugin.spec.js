import { Base64 } from "js-base64";
import serviceKey from "./_fixtures/service-key";
import * as plugin from "../lib";

it("can decode an encoded service key", () => {
  const encodedServiceKey = Base64.encode(JSON.stringify(serviceKey));
  expect(plugin.decodeServiceKey(encodedServiceKey)).toEqual(serviceKey);
});
