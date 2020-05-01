const fs = require("fs");
const shell = require("shelljs");
const Base64 = require("js-base64").Base64;
const NodeGit = require("nodegit");

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
 * @return void
 */
function execute(cmd) {
  shell.echo(cmd);
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
  NodeGit.Clone(options.repo, options.path, {
    fetchOpts: {
      callbacks: {
        certificateCheck: () => 0,
        credentials: (url, userName) => {
          try {
            return NodeGit.Cred.sshKeyNew(
              userName,
              options.publicKey,
              options.privateKey,
              options.passphrase
            );
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  })
    .then((repo) => {
      return repo
        .getHeadCommit()
        .then((targetCommit) =>
          repo.createBranch(options.branch, targetCommit, false)
        )
        .then((reference) => repo.checkoutBranch(reference, {}))
        .then(() =>
          repo.getReferenceCommit("refs/remotes/origin/" + options.branch)
        )
        .then((commit) => NodeGit.Reset.reset(repo, commit, 3, {}));
    })
    .catch((error) => console.log("error >>", error));
}

module.exports = {
  versions: versions,
  decodeServiceKey: decodeServiceKey,
  writeFile: writeFile,
  authorizeServiceAccount: authorizeServiceAccount,
  setCluster: setCluster,
  echoArtefact: echoArtefact,
  applyArtefact: applyArtefact,
  clone: clone
};
