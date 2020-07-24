import { assertStringContains } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import { walk, readFileStr } from "https://deno.land/std@0.61.0/fs/mod.ts";
import Parser from "../Parser.ts";

// setup

const __dirname = new URL(".", import.meta.url).pathname;

const fixturesDir: string = `${__dirname}../__fixtures__`;

const fixtures: string[] = [
  `${fixturesDir}/service.yml`,
  `${fixturesDir}/deployment.yaml`,
];

// describe

Deno.test("it can parse templates", async function (): Promise<void> {
  const parser = new Parser(fixtures);

  const path = await parser.parse({
    name: "example-app",
    version: "1.2.3",
    meta: {
      tier: "network",
      deployment: "green",
    },
  });

  let files = walk(path, { includeDirs: false });

  for await (const entry of files) {
    let content: string = await readFileStr(entry.path);

    assertStringContains(content, `name: example-app`);
    assertStringContains(content, `version: 1.2.3`);
    assertStringContains(content, `tier: network`);
    assertStringContains(content, `deployment: green`);
  }
});

Deno.test("it does not modify original templates", async function (): Promise<
  void
> {
  let parser = new Parser(fixtures);

  await parser.parse({
    name: "example-app",
    version: "1.2.3",
    meta: {
      tier: "network",
      deployment: "green",
    },
  });

  let files = walk(fixturesDir, { includeDirs: false });

  for await (const entry of files) {
    let content: string = await readFileStr(entry.path);

    assertStringContains(content, `name: <%= name %>`);
    assertStringContains(content, `version: <%= version %>`);
    assertStringContains(content, `tier: <%= meta.tier %>`);
    assertStringContains(content, `deployment: <%= meta.deployment %>`);
  }
});
