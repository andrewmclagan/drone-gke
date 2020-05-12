import { config } from "https://raw.githubusercontent.com/gewoonwoutje/deno-dotenv/master/dotenv.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Env from "../Env.ts";

config({ path: "./.env.testing", export: true });

// Env.get()
Deno.test("it can return env var", () => {
  assertEquals(Env.get("TEMPLATES"), "**/__fixtures__/**/*.{yml,yaml}");
});

Deno.test("it can return env var by checking multiple keys", () => {
  assertEquals(
    Env.get(["NOT_TEMPLATES", "MAYBE_TEMPLATES", "TEMPLATES"]),
    "**/__fixtures__/**/*.{yml,yaml}"
  );
});

// Env.getJson()

Deno.test("it can decode json strings", () => {
  assertEquals(Env.getJson("REPOSITORY"), {
    remote: "git@github.com:andrewmclagan/drone-gke.git",
    branch: "master",
  });
});

Deno.test("it always returns an object", () => {
  assertEquals(Env.getJson("EMPTY"), {});
});
