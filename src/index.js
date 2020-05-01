import path from "path";
import * as plugin from "./lib";

const serviceKeyString =
  process.env.GKE_KEY || process.env.PLUGIN_GKE_KEY || null;

if (!serviceKeyString) {
  console.log(
    "Invalid key file, please provide a base64 encoded key file in the GKE_KEY environment variable or drone secret."
  );
  process.exit(1);
}

plugin.versions();

const serviceKey = plugin.decodeServiceKey(serviceKeyString);

const params = plugin.getTemplateParams(process.env);

const artefacts = plugin.getArtefacts(process.env.PLUGIN_ARTEFACTS);

const namespace = process.env.PLUGIN_NAMESPACE || "";

// Authorise and set cluster

plugin.writeFile("./service-account-key.json", JSON.stringify(serviceKey));

plugin.authorizeServiceAccount(
  "./service-account-key.json",
  serviceKey.client_email,
  serviceKey.project_id
);

plugin.setCluster(params.plugin.cluster, params.plugin.zone);

// clone configuration repo

let REPO_PATH = "";

if (process.env.PLUGIN_REPO) {
  REPO_PATH = "/__gitops-config-repo";

  plugin.cloneRepo({
    repo: process.env.PLUGIN_REPO,
    path: REPO_PATH,
    publicKey: process.env.PLUGIN_PUBLIC_KEY,
    privateKey: process.env.PLUGIN_PRIVATE_KEY,
    branch: process.env.DRONE_BRANCH
  });
}

// Process and apply artefacts

artefacts.forEach(function (artefact) {
  const templatePath = path.join(REPO_PATH, path.resolve(artefact));
  const templateString = template.praseTemplate(templatePath, params);
  plugin.writeFile(artefact, templateString);
  plugin.echoArtefact(artefact);
  plugin.applyArtefact(artefact, namespace);
});
