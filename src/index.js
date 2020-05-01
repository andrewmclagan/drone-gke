const path = require("path");
const plugin = require("./plugin");
const template = require("./template");

const serviceKeyString =
  process.env.GCE_KEY || process.env.PLUGIN_GCE_KEY || null;

if (!serviceKeyString) {
  console.log(
    "Invalid key file, please provide a base64 encoded key file in the GCE_KEY environment variable or drone secret."
  );
  process.exit(1);
}

plugin.versions();

const serviceKey = plugin.decodeServiceKey(serviceKeyString);

const params = template.getTemplateParams(process.env);

const artefacts = process.env.PLUGIN_ARTEFACTS.split(",");

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

  plugin.clone({
    repo: process.env.PLUGIN_REPO,
    path: REPO_PATH,
    publicKey: process.env.PLUGIN_PUBLIC_KEY,
    privateKey: process.env.PLUGIN_PRIVATE_KEY,
    passphrase: process.env.PLUGIN_PASSPHRASE,
    branch: process.env.DRONE_BRANCH,
  });
}

// Process and apply artefacts

artefacts.forEach(function (artefact) {
  const templatePath = path.join(REPO_PATH, artefact);
  const templateString = template.processTemplate(templatePath, params);
  plugin.writeFile(artefact, templateString);
  plugin.echoArtefact(artefact);
  plugin.applyArtefact(artefact, namespace);
});
