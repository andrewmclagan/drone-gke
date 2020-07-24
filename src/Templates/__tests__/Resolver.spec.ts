import { assertStringContains } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import Resolver from "../Resolver.ts";

const __dirname = new URL(".", import.meta.url).pathname;

const fixturesDir: string = `${__dirname}../__fixtures__`;

const glob: string = "**/*.{yml,yaml}";

Deno.test("it can resolve templates", async function (): Promise<void> {
  let resolver = new Resolver(fixturesDir, glob);

  let paths: Array<string> = await resolver.resolve();

  assertStringContains(paths[0], "__fixtures__/deployment.yaml");

  assertStringContains(paths[1], "__fixtures__/service.yml");
});
