import { decode } from "../utils/base64.js";

export default class Cluster {
  shell = undefined;

  constructor(shell, encodedServiceKey) {
    this.shell = shell;
    this.authorizeServiceAccount(encodedServiceKey);
  }

  authorizeServiceAccount(encodedServiceKey) {
    const serviceKey = this._decodeServiceKey(encodedServiceKey);
    const serviceKeyPath = this._writeServiceKey(serviceKey);

    this.shell(`
      gcloud auth activate-service-account \
        ${serviceKey.client_email} \
        --key-file ${serviceKeyPath} \
        --project ${serviceKey.project_id}
    `);
  }

  setCluster(zone, cluster, namespace) {
    this.shell(`
      gcloud container clusters get-credentials ${cluster} --zone ${zone}
    `);

    if (namespace) {
      this.shell(`
        kubectl config set-context --current --namespace ${namespace}
      `);
    }
  }

  applyArtefacts(paths = []) {
    paths.forEach((path) => {
      this.shell(`kubectl apply -f ${path} --record`);
    });
  }

  _decodeServiceKey(encodedKey) {
    return JSON.parse(decode(encodedKey));
  }

  _writeServiceKey(serviceKey) {
    const path = path.resolve("./gke-service-key.json");
    fs.writeFileSync(path, JSON.stringify(serviceKey));
    return path;
  }
}
