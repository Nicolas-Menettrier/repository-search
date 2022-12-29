export interface Owner {
  login: string;
  avatar_url: string;
}

export interface License {
  key: string;
  name: string;
  url: string;
  spdx_id: string;
  node_id: string;
  html_url: string;
}

export interface Repository {
  id: number;
  full_name: string;
  owner: Owner;
  html_url: string;
  description: string;
}

export interface GithubRepositoryResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}
