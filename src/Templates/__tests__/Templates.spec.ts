import { assertStringContains } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import { walk, readFileStr } from "https://deno.land/std@0.61.0/fs/mod.ts";
import Templates from "../Templates.ts";

// setup

const __dirname = new URL(".", import.meta.url).pathname;

const fixturesDir: string = `${__dirname}../__fixtures__`;

const glob: string = "**/*.{yml,yaml}";

// describe

Deno.test("it can find templates and parse them", async function (): Promise<
  void
> {
  let templates = new Templates(fixturesDir, glob);

  const pathToTemplates: string = await templates.parse({
    name: "example-app",
    version: "1.2.3",
    meta: {
      tier: "network",
      deployment: "green",
    },
  });

  let files = walk(pathToTemplates, { includeDirs: false });

  for await (const entry of files) {
    let content: string = await readFileStr(entry.path);

    assertStringContains(content, `name: example-app`);
    assertStringContains(content, `version: 1.2.3`);
    assertStringContains(content, `tier: network`);
    assertStringContains(content, `deployment: green`);
  }
});
