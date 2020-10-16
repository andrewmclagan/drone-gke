export interface Config {
  kustomize: string;
  force: boolean;
  cluster: ClusterConfig;
}

export interface ClusterConfig {
  service_key: object;
  name: string;
  zone: string;
  namespace?: string;
}
