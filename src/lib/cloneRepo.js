import fs from "fs";
import execute from "./execute";
import shell from "shelljs";
import { Base64 } from "js-base64";

export default function cloneRepo(options) {
  shell.echo("Cloning config repo...");

  const privateKey = Base64.decode(options.privateKey);

  fs.writeFileSync("/tmp/id_rsa", privateKey, { mode: 0o600 });

  const publicKey = Base64.decode(options.publicKey);

  fs.writeFileSync("/tmp/id_rsa.pub", publicKey, { mode: 0o644 });

  execute(`mkdir -p ${options.path}`, false);

  execute(`
    git clone -c core.sshCommand="ssh -i /tmp/id_rsa" --single-branch --branch ${options.branch} ${options.repo} ${options.path} --depth=3
  `);
}
