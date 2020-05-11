import { config } from "https://raw.githubusercontent.com/gewoonwoutje/deno-dotenv/master/dotenv.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import serviceKey from "./__fixtures__/service-key.json";
import Plugin from "./Plugin.ts";

config({ path: "./.env.testing", export: true });

// Plugin.getEnvConfig()
Deno.test("it can get config from environment", () => {
  assertEquals(Plugin.getEnvConfig(), {
    templates: "**/__fixtures__/**/*.{yml,yaml}",
    repository: {
      remote: "git@github.com:andrewmclagan/drone-gke.git",
      branch: "master",
    },
    cluster: {
      name: "example-cluster",
      zone: "australia-southeast1-a",
      namespace: "production",
      serviceKey,
    },
  });
});

Deno.test("it has default templates glob", () => {
  Deno.env.set("TEMPLATES", "");
  assertEquals(Plugin.getEnvConfig().templates, "**/*.{yml,yaml}");
});

Deno.test("it has default repository branch", () => {
  Deno.env.set(
    "REPOSITORY",
    '{"remote": "git@github.com:andrewmclagan/drone-gke.git"}'
  );
  assertEquals(Plugin.getEnvConfig().repository?.branch, "master");
});

Deno.test("it has default cluster namespace", () => {
  Deno.env.set(
    "CLUSTER",
    '{"name": "example-cluster", "zone": "australia-southeast1-a"}'
  );
  assertEquals(Plugin.getEnvConfig().cluster.namespace, "");
});
