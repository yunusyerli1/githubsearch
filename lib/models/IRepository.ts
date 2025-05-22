export interface IRepository {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
        html_url: string;
    };
    html_url: string;
    description: string | null;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: {
        key: string;
        name: string;
        url: string;
    } | null;
    topics: string[];
    visibility: string;
    forks: number;
    watchers: number;
    default_branch: string;
    score: number;
} 

export interface IGitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  
  export interface IGitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    owner: IGitHubUser;
    updated_at: string;
  }
  
  export interface IGitHubRepositoryDetails extends IGitHubRepository {
    forks_count: number;
    open_issues_count: number;
    watchers_count: number;
    license: {
      name: string;
      url: string;
    } | null;
    created_at: string;
    homepage: string | null;
    topics: string[];
  }
  
  export interface IGitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: IGitHubRepository[];
  } 