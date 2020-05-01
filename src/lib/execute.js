import shell from "shelljs";

export default function execute(cmd, echo = true) {
  if (echo) {
    shell.echo(cmd);
  }
  if (shell.exec(cmd).code !== 0) {
    shell.exit(1);
  }
}