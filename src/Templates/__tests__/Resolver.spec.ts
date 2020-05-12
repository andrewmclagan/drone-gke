import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Resolver from "../Resolver.ts";

const root: string = "src/Templates/__fixtures__";

const glob: string = "**/*.{yml,yaml}";

Deno.test("it can resolve templates", async function (): Promise<void> {
  let resolver = new Resolver(glob, root);
  let paths: Array<string> = await resolver.resolve();
  assertEquals(paths[0], "src/Templates/__fixtures__/deployment.yaml");
  assertEquals(paths[1], "src/Templates/__fixtures__/service.yml");
});
