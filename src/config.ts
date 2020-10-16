export interface Config {
  kustomize?: string;
  cluster: ClusterConfig;
}

export interface ClusterConfig {
  service_key: object;
  name: string;
  zone: string;
  namespace?: string;
}
