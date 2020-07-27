import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.61.0/testing/asserts.ts";
import {
  stub,
  Stub,
} from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/stub.ts";
import { exists, readFileStr } from "https://deno.land/std@0.61.0/fs/mod.ts";
import Cmd from "../Cmd.ts";
import Cluster from "../Cluster.ts";

const config = {
  name: "example-cluster",
  zone: "zone-australia-1a",
  namespace: "production",
  service_key: {
    type: "...",
    project_id: "example-project",
    private_key_id: "...",
    private_key: "...",
    client_email: "example@example.iam.gserviceaccount.com",
    client_id: "...",
  },
};

Deno.test("it sets cluster authentication", async () => {
  const cmd = new Cmd();
  const run: Stub<Cmd> = stub(cmd, "run");

  const cluster = new Cluster(config, cmd);
  await cluster.authorize();

  const command: string[] = run.calls[0].args[0];

  assertEquals(command[0], "gcloud");
  assertEquals(command[1], "auth");
  assertEquals(command[2], "activate-service-account");
  assertEquals(command[3], config.service_key.client_email);
  assertEquals(command[5], `--project=${config.service_key.project_id}`);
});

Deno.test("it creates an auth key file", async () => {
  const cmd = new Cmd();
  const run: Stub<Cmd> = stub(cmd, "run");

  const cluster = new Cluster(config, cmd);
  await cluster.authorize();

  const keyArg: string = run.calls[0].args[0][4];

  const keyPath: string = keyArg.split(`--key-file=`)[1];

  assert(keyArg.includes(`gc-service-key.json`));
  assert(await exists(keyPath));
});

Deno.test("it sets cluster context", async () => {
  const cmd = new Cmd();
  const run: Stub<Cmd> = stub(cmd, "run");

  const cluster = new Cluster(config, cmd);
  await cluster.authorize();

  const command: string[] = run.calls[1].args[0];

  assertEquals(command[0], "gcloud");
  assertEquals(command[1], "container");
  assertEquals(command[2], "clusters");
  assertEquals(command[3], "get-credentials");
  assertEquals(command[4], config.name);
  assertEquals(command[5], `--zone=${config.zone}`);
});

Deno.test("it sets cluster namespace context", async () => {
  const cmd = new Cmd();
  const run: Stub<Cmd> = stub(cmd, "run");

  const cluster = new Cluster(config, cmd);
  await cluster.authorize();

  const command: string[] = run.calls[2].args[0];

  assertEquals(command[0], "kubectl");
  assertEquals(command[1], "config");
  assertEquals(command[2], "set-context");
  assertEquals(command[3], "--current");
  assertEquals(command[4], `--namespace=${config.namespace}`);
});

Deno.test("applies template configs", async () => {
  const cmd = new Cmd();
  const run: Stub<Cmd> = stub(cmd, "run");
  const path: string = "/path/to/defninitions";

  const cluster = new Cluster(config, cmd);
  await cluster.apply(path);

  assertEquals(run.calls.length, 1);

  assertEquals(run.calls[0].args[0], [
    "kubectl",
    "apply",
    `--filename=${path}`,
    "--recursive",
    "--record",
  ]);
});
