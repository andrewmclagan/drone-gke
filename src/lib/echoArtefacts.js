import shell from "shelljs";

export default function echoArtefact(pathToArtefact) {
  shell.echo("---------------------------------");
  shell.echo("---------------------------------");
  shell.exec(`cat ${pathToArtefact}`);
  shell.echo("---------------------------------");
  shell.echo("---------------------------------");
}