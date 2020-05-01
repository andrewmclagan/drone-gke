import execute from "./execute";

export default function setCluster(cluster, zone) {
  execute(`
    gcloud container clusters get-credentials ${cluster} --zone ${zone}
  `);
}
