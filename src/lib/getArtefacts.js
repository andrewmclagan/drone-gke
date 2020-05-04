import glob from "glob";

export default function getArtefacts(paths = "") {
  let artefacts = [];

  if (paths.includes(",")) {
    artefacts = paths.split(",");
  } else {
    glob(__dirname + "/**/*.yml", {}, (err, files) => artefacts.join(files));
    glob(__dirname + "/**/*.yaml", {}, (err, files) => artefacts.join(files));
  }

  return artefacts;
}