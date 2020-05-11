const { remove } = Deno;
import { exists } from "https://deno.land/std/fs/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import Repository from "./Repository.ts";

const config: any = {
  remote: "git@github.com:andrewmclagan/drone-gke.git",
  branch: "master",
};

Deno.test("it can clone a repository", async function (): Promise<void> {
  let repository = new Repository(config);
  let path = await repository.clone();
  assert(await exists(`${path}/.git`));
  await remove(path, { recursive: true });
});
