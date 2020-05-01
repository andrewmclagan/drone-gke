import execute from "./execute";

export default function authorizeServiceAccount(pathToKey, serviceAccountEmail, projectName) {
  execute(`
    gcloud auth activate-service-account \
      ${serviceAccountEmail} \
      --key-file ${pathToKey} \
      --project ${projectName}
  `);
}
