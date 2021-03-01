export interface Config {
  commands: string[];
  force: boolean;
  cluster: ClusterConfig;
}

export interface ClusterConfig {
  service_key: object;
  name: string;
  region: string;
  namespace?: string;
}
