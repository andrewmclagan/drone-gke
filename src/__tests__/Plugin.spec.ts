import { config } from "https://raw.githubusercontent.com/gewoonwoutje/deno-dotenv/master/dotenv.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Plugin from "../Plugin.ts";

config({ path: "./.env.testing", export: true });

const serviceKey = {
  type: "service_account",
  project_id: "example-project",
  private_key_id: "1234-example-id",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nKKFJvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgSDkdIfKQCV8Ob/3XiK0kWQ\nNgUeu3/JCQ8doSL+rUGE0MZPRRIlIYNq7EKI0lrBOuHHnLSsTdcECglymXa/zvlG\ne86PN2MtvCD3Vxr1ClpHdp5VeXQvV8Gpmf6QFqI9jouEnqS7x32DrE3YzgyeqEHo\nz1++UAKCi7Nul8SnB6Uh9lm2qVlgVxykKt9X/hJa1wI3X267sxh9BzWh2LCwcLtQ\nhpM19M6u4cx503iGESGHrfZ14iJjmG2OT0dspEUVXXOU6nUu9e7CMXQ7e++zTXlX\n7sRFP71Gw6uBGZymgf/55TDpjJNXc9RDUH2cnaj0xZ9yahNJbWDznQri0Sr3ZVOG\na4ba7CGdAgMBAAECggEAAsG5d9GKO5u8hGUtSsdt4D0iL4Mzj5T/LSt0DV6fX2yt\n0IOoycmgTIjCG8nGAFL9w2RR2W8KvWGgb4H0ysST2wR6h4rIXpkeM2AESji7N59T\n7Pq0MPXatsVygoPpm+A4t+aIvChazuaGC7IXODFR9xCfwiHYoa1APDOwPLa4Ok9D\n67wq9xPc32zIxrgZ2V7FYpeqAupXiWcGjpx0kfigY0KWTq2JfVWQHgYbkDV4Ne6U\ncQwYLHCmJyzfmkyZEfxfNgyDAPbCrMWHQioNiALmTLO8W26nf0duptdWQiJvERI3\ntjgCxapiKQCpOQtgOI2avrdKr52bnejQJvGxRLDvGwKBgQDNRtoBJJHfukoPR0cL\ntzxPMjMxXTPCUyqPwOTTK4QvWyyWyxWpNQnVLBkxkqWkkVMZff/R/Tp8CjXGc74L\nWfFTfFXFiXwSwUwX/G3V3W/db2X3QxGcx68CpRsZJehZtk2UFnsBSkGUI/TVzjGl\ni6wnwy/XZyliIunjGgsiW5bv0wKBgQC6/bCRwQDqZ76jILbSjN5eCzdR67ryNm0T\nAgoPaRRp/jpkoCkFec9PW/ky741RzV42kLw42KJXP1qfevDoF4PrcrdDufyKWh0N\n9L467FtN0ElfAoZOpZS89U5QNX6q+emra6zNJAZ/JWm2JHru5u7yAeewu64jpz4x\nHbkkDjMyzwKBgHfV++Cc67fTNfbzYmtZfhCxuqb/xP6VtIwVTMBmcBWBQWeKiUut\nld7njpGdDawj1oJURyrcjO7quvfui6xuxm45cI0QNOlyBK0gBTLLwclghgMyGS8Q\nd3+wyUAGHD17KpDgCtD2+4+y6fSDGgKNpmPUE7LJG6SZwzZ79rIJC/VXAoGBALCK\nJxPU9jpYbEGy9yhd2utLB5WOS1e2TtBtUnYuLRnM7fBmzZPf5vvzx5hxVijvDY3S\npAG/dbWNmM+M0LkuyluWWLPWejlczqWIdblHwQP8K+lJhuflqEGmD6PmfYqKnDQ9\nWk3rPz73YZCXbID1Ao71gXr4FnaOxUa12z/RMEE9AoGAba4xMRecYGv312nXZIFa\n4+Tr+SOZdJQGbNEmduje4Ius21QD9hfdDyVNbdC/AEh24yKeV2glQzS6B/UKzYf4\nuIybQDpYQ/sHfaDItsa067yKa/105NZ84xaalNI26QDKRP7bOcmMtJEa/17BPbrT\nrDMj6doi876ItojGL01L6rg=\n-----END PRIVATE KEY-----\n",
  client_email: "example@example.iam.gserviceaccount.com",
  client_id: "123-456-789",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/example.iam.gserviceaccount.com",
};

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