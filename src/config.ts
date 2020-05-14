export interface Config {
  templates?: string;
  repository?: RepositoryConfig;
  cluster: ClusterConfig;
}

export interface ClusterConfig {
  serviceKey: object;
  name: string;
  zone: string;
  namespace?: string;
}

export interface RepositoryConfig {
  remote: string;
  branch?: string;
  privateKey?: string;
}
