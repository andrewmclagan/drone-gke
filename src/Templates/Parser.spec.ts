const { remove } = Deno;
import { assert } from "https://deno.land/std/testing/asserts.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import Parser from "./Parser.ts";

const fixtures: Array<string> = [
  "./src/Templates/__fixtures__/service.yml",
  "./src/Templates/__fixtures__/deployment.yaml",
];

Deno.test("it can parse templates", async function (): Promise<void> {
  let parser = new Parser(fixtures);

  const paths = await parser.parse({
    name: "example-service",
    version: "1.1.1",
    labels: { foo: "bar-123", bar: "foo-123" },
  });

  // service.yml
  let content: string = await readFileStr(paths[0]);
  assert(content.includes(`name: example-service`));
  assert(content.includes(`foo: bar-123`));
  assert(content.includes(`bar: foo-123`));
  assert(content.includes(`version: 1.1.1`));

  // deployment.yaml
  content = await readFileStr(paths[1]);
  assert(content.includes(`name: example-service`));
  assert(content.includes(`foo: bar-123`));
  assert(content.includes(`bar: foo-123`));
  assert(content.includes(`image: "hello-world:1.1.1"`));

  await remove(paths[0]);
  await remove(paths[1]);  
});

Deno.test("it does not modify original templates", async function (): Promise<
  void
> {
  let parser = new Parser(fixtures);

  const paths = await parser.parse({
    name: "example-service",
    version: "1.1.1",
    labels: { foo: "bar-123", bar: "foo-123" },
  });

  // service.yml
  let content: string = await readFileStr(fixtures[0]);
  assert(content.includes(`name: <%= name %>`));
  assert(content.includes(`foo: <%= labels.foo %>`));
  assert(content.includes(`bar: <%= labels.bar %>`));
  assert(content.includes(`version: <%= version %>`));

  // deployment.yaml
  content = await readFileStr(fixtures[1]);
  assert(content.includes(`name: <%= name %>`));
  assert(content.includes(`foo: <%= labels.foo %>`));
  assert(content.includes(`bar: <%= labels.bar %>`));
  assert(content.includes(`image: "hello-world:<%= version %>"`));

  await remove(paths[0]);
  await remove(paths[1]);  
});
