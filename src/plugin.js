const fs = require("fs");
const shell = require("shelljs");
const Base64 = require("js-base64").Base64;
const glob = require("glob");

/**
 * Decodes a base64 encoded service key
 *
 * @param string key
 * @return Object
 */
function decodeServiceKey(key) {
  return JSON.parse(Base64.decode(key));
}

/**
 * Execute a command
 *
 * @param string cmd
 * @param bool echo
 * @return void
 */
function execute(cmd, echo = true) {
  if (echo) {
    shell.echo(cmd);
  }
  if (shell.exec(cmd).code !== 0) {
    shell.exit(1);
  }
}

/**
 * Displays versions of cli tools
 *
 * @return void
 */
function versions() {
  shell.exec(`gcloud --version`);
}

/**
 * Authorises service account with gcloud cli
 *
 * @param string pathToKey
 * @param string serviceAccountEmail
 * @param string projectName
 * @return Bool
 */
function authorizeServiceAccount(pathToKey, serviceAccountEmail, projectName) {
  execute(`
    gcloud auth activate-service-account \
      ${serviceAccountEmail} \
      --key-file ${pathToKey} \
      --project ${projectName}
  `);
}

/**
 * Sets the working cluster through gcloud cli
 *
 * @param string cluster
 * @param string zone
 * @return Bool
 */
function setCluster(cluster, zone) {
  execute(`
    gcloud container clusters get-credentials ${cluster} --zone ${zone}
  `);
}

/**
 * return array of yaml file paths
 *
 * @param string paths
 * @return Bool
 */
function getArtefacts(paths = "") {
  let artefacts = [];

  if (paths.includes(",")) {
    artefacts = paths.split(",");
  } else if (paths === "*") {
    glob(__dirname + "/**/*.yml", {}, (err, files) => artefacts.join(files));
    glob(__dirname + "/**/*.yaml", {}, (err, files) => artefacts.join(files));
  }

  return artefacts;
}

/**
 * Executes a kubernetes template file on the cluster
 *
 * @param string pathToArtefact
 * @param string namespace
 * @return Bool
 */
function echoArtefact(pathToArtefact) {
  shell.echo("---------------------------------");
  shell.echo("---------------------------------");
  shell.exec(`cat ${pathToArtefact}`);
  shell.echo("---------------------------------");
  shell.echo("---------------------------------");
}

/**
 * Executes a kubernetes template file on the cluster
 *
 * @param string pathToArtefact
 * @param string namespace
 * @return Bool
 */
function applyArtefact(pathToArtefact, namespace = "") {
  const namespaceArg = namespace ? `--namespace=${namespace}` : "";
  execute(`
    kubectl apply -f ${pathToArtefact} --record ${namespaceArg}
  `);
}

/**
 * writes a file to disk
 *
 * @param string pathToFile
 * @param string fileString
 * @return Bool
 */
function writeFile(pathToFile, fileString) {
  return fs.writeFileSync(pathToFile, fileString);
}

/**
 * Clones a git repo
 *
 * @param object options for cloning
 * @return void
 */
function clone(options) {
  const privateKey = Base64.decode(options.privateKey);

  fs.writeFileSync('/tmp/id_rsa', privateKey, { mode: 0o600 });

  const publicKey = Base64.decode(options.publicKey);

  fs.writeFileSync('/tmp/id_rsa.pub', publicKey, { mode: 0o644 });  

  execute(
    `
    mkdir -p ${options.path}
  `,
    false
  );

  execute(`
    git clone -c core.sshCommand="ssh -i /tmp/id_rsa" --single-branch --branch ${options.branch} ${options.repo} ${options.path} --depth=3
  `);
}

module.exports = {
  versions: versions,
  decodeServiceKey: decodeServiceKey,
  writeFile: writeFile,
  authorizeServiceAccount: authorizeServiceAccount,
  setCluster: setCluster,
  getArtefacts: getArtefacts,
  echoArtefact: echoArtefact,
  applyArtefact: applyArtefact,
  clone: clone,
};
