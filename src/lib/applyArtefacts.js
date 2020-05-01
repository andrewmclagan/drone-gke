import execute from "./execute";

export default function applyArtefact(pathToArtefact, namespace = "") {
  const namespaceArg = namespace ? `--namespace=${namespace}` : "";
  execute(`
    kubectl apply -f ${pathToArtefact} --record ${namespaceArg}
  `);
}
