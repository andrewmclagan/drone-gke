import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.50.0/testing/asserts.ts";
import {
  stub,
  Stub,
} from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/stub.ts";
import Plugin from "../Plugin.ts";
import Cmd from "../Cmd.ts";

/**
 * TODO: extend this as an integration test
 */

Deno.test({
  name: "it works (smoke test)",
  async fn(): Promise<void> {
    const config: any = {
      templates: "**/__fixtures__/**/*.{yaml,yml}",
      repository: undefined,
      cluster: {
        name: "example-cluster",
        zone: "australia-southeast1-a",
        serviceKey: {
          project_id: "example-project",
          client_email: "example@example.iam.gserviceaccount.com",
        },
      },
    };

    Deno.env.set("FOO", "bar");
    Deno.env.set("BAR", "foo");
    Deno.env.set("VERSION", "v1.0.0");

    const cmd = new Cmd();
    const run: Stub<Cmd> = stub(cmd, "run");

    await new Plugin(config, cmd).run();

    const commands = [];

    commands.push(run.calls[0].args[0]);
    commands.push(run.calls[1].args[0]);
    commands.push(run.calls[2].args[0]);

    assertEquals(commands[0], [
      "gcloud",
      "auth",
      "activate-service-account",
      "example@example.iam.gserviceaccount.com",
      "--key-file=/tmp/service-key.json",
      "--project=example-project",
    ]);

    assertEquals(commands[1], [
      "gcloud",
      "container",
      "clusters",
      "get-credentials",
      "example-cluster",
      "--zone=australia-southeast1-a",
    ]);

    assertEquals(commands[2][0], "kubectl");
    assertEquals(commands[2][1], "apply");
    assert(commands[2][2].includes("--filename=/"));
    assertEquals(commands[2][3], "--recursive");
  },
});
