import path from "path";
import * as plugin from "./lib";
import { getEnv } from "./utils";

const serviceKeyString = getEnv('GKE_JSON_KEY')

if (!serviceKeyString) {
  console.log(
    "Invalid key file, please provide a base64 encoded key file in the GKE_JSON_KEY environment variable or drone secret."
  );
  process.exit(1);
}

plugin.versions();

const serviceKey = plugin.decodeServiceKey(serviceKeyString);

const templateParams = plugin.getTemplateParams(process.env);

const artefactPaths = plugin.getArtefacts(getEnv('ARTEFACTS'));

// Authorise and set cluster

plugin.writeFile("./service-account-key.json", JSON.stringify(serviceKey));

plugin.authorizeServiceAccount(
  "./service-account-key.json",
  serviceKey.client_email,
  serviceKey.project_id
);

plugin.setCluster(getEnv('CLUSTER'), getEnv('ZONE'));

// clone configuration repo

let REPO_PATH = "";

if (getEnv('CONFIG_REPO')) {
  REPO_PATH = "/__gitops-config-repo";

  plugin.cloneRepo({
    repo: getEnv('CONFIG_REPO'),
    path: REPO_PATH,
    publicKey: getEnv('REPO_PUBLIC_KEY'),
    privateKey: getEnv('REPO_PRIVATE_KEY'),
    branch: getEnv('BRANCH')
  });
}

// Process and apply artefacts

artefactPaths.forEach(function (artefact) {
  const templatePath = path.join(REPO_PATH, path.resolve(artefact));
  const templateString = template.praseTemplate(templatePath, templateParams);
  plugin.writeFile(artefact, templateString);
  plugin.echoArtefact(artefact);
  plugin.applyArtefact(artefact, getEnv('NAMESPACE'));
});
