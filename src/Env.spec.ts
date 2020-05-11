import { config } from "https://raw.githubusercontent.com/gewoonwoutje/deno-dotenv/master/dotenv.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Env from "./Env.ts";

config({ path: "./.env.testing", export: true });

// Env.get()
Deno.test("it can return env var", () => {
  assertEquals(Env.get("FOO"), "bar");
});

Deno.test("it can return env var by checking multiple keys", () => {
  assertEquals(Env.get(["EMPTY", "BAR"]), "foo");
});

Deno.test("it returns first env var", () => {
  assertEquals(Env.get(["EMPTY", "BAR", "FOO"]), "foo");
});

// Env.getJson()

Deno.test("it can decode json strings", () => {
  assertEquals(Env.getJson("PERSON"), {
    name: "Testy McTester",
    age: 37,
    sex: "unknown",
  });
  assertEquals(Env.getJson("CAT"), {
    name: "Catty McCat",
    age: 2,
    sex: "unknown",
  });
});

Deno.test("it always returns an object", () => {
  assertEquals(Env.getJson("EMPTY"), {});
  assertEquals(Env.getJson("FOO"), {});
});
