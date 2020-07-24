export interface Config {
  glob?: string;
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
  netrc: NetrcConfig;
}

export interface NetrcConfig {
  machine: string;
  login: string;
  password: string;
}
