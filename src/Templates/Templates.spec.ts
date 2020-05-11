const { remove } = Deno;
import { assert } from "https://deno.land/std/testing/asserts.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import Templates from "./Templates.ts";

Deno.test("it can find templates and parse them", async function (): Promise<
  void
> {
  const glob: string = "**/src/**/*.{yml,yaml}";

  let templates = new Templates(glob);

  const paths: Array<string> = await templates.parse({
    name: "example-service",
    version: "1.1.1",
    labels: { foo: "bar-123", bar: "foo-123" },
  });

  // deployment.yaml
  let content = await readFileStr(paths[0]);
  assert(content.includes(`name: example-service`));
  assert(content.includes(`foo: bar-123`));
  assert(content.includes(`bar: foo-123`));
  assert(content.includes(`image: "hello-world:1.1.1"`));

  // service.yml
  content = await readFileStr(paths[1]);
  assert(content.includes(`name: example-service`));
  assert(content.includes(`foo: bar-123`));
  assert(content.includes(`bar: foo-123`));
  assert(content.includes(`version: 1.1.1`));

  await remove(paths[0]);
  await remove(paths[1]);
});

Deno.test(
  "it can clone a template config repository and parse them",
  async function (): Promise<void> {
    const glob: string = "**/*.{yml,yaml}";

    const config: any = {
      remote: "git@github.com:andrewmclagan/drone-gke-fixture.git",
      branch: "master",
    };

    let templates = new Templates(glob, config);

    const paths: Array<string> = await templates.parse({
      name: "example-service",
      version: "1.1.1",
      labels: { foo: "bar-123", bar: "foo-123" },
    });

    // deployment.yaml
    let content = await readFileStr(paths[0]);
    assert(content.includes(`name: example-service`));
    assert(content.includes(`foo: bar-123`));
    assert(content.includes(`bar: foo-123`));
    assert(content.includes(`image: "hello-world:1.1.1"`));

    // service.yml
    content = await readFileStr(paths[1]);
    assert(content.includes(`name: example-service`));
    assert(content.includes(`foo: bar-123`));
    assert(content.includes(`bar: foo-123`));
    assert(content.includes(`version: 1.1.1`));

    await remove(paths[0]);
    await remove(paths[1]);
  }
);
