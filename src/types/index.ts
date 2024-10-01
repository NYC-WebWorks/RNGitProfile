export type TUserProfile = {
  avatarUrl: string;
  bio?: string;
  company?: string;
  createdAt: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  location?: string;
  name?: string;
  repositories: {
    totalCount: number;
  };
  socialAccounts: {
    nodes: any[];
  };
  status?: {
    emojiHTML?: string;
    emoji?: string;
    message?: string;
  };
  twitterUsername?: string;
  url: string;
  websiteUrl?: string;
};

export type TUserData = {
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
  repositoriesContributedTo: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
  issues: {
    totalCount: number;
  };
  organizations: {
    totalCount: number;
  };
  sponsoring: {
    totalCount: number;
  };
  sponsors: {
    totalCount: number;
  };
  createdAt: string;
  updatedAt: string;
  repositoriesWithStargazerCount: {
    totalCount: number;
    nodes: { stargazerCount: number }[];
  };
  repositories: {
    nodes: {
      name: string;
      stargazerCount: number;
      defaultBranchRef: { target: { history: { totalCount: number } } };
      languages: { edges: string[] };
    }[];
  };
  popularRepositories: {
    nodes: {
      name: string;
      description: string;
      stargazerCount: number;
      forkCount: number;
      diskUsage: number;
      url: string;
      createdAt: string;
      primaryLanguage?: string | null;
      issues: { totalCount: number };
      pullRequests: { totalCount: number };
    }[];
  };
  contributionsCollection: {
    totalCommitContributions: number;
    pullRequestContributionsByRepository: any[];
    contributionCalendar: {
      weeks: {
        contributionDays: {
          contributionCount: number;
          contributionLevel: string;
          date: string;
        }[];
      }[];
    };
  };
};

export type TFollowUp = {
  login: string;
  issues_by_user: {
    open: number;
    closed: number;
    draft: number;
    skipped: number;
  };
  pr_by_user: {
    open: number;
    merged: number;
    draft: number;
    closed: number;
  };
  issues_on_user: {
    open: number;
    closed: number;
    draft: number;
    skipped: number;
  };
  pr_on_user: {
    open: number;
    merged: number;
    draft: number;
    closed: number;
  };
};

export type TUserStats = {
  Followers: number;
  Repositories: number;
  Organizations: number;
  Gists: number;
  'Pull Requests': number;
  Issues: number;
  Commits: number;
  Sponsors: number;
  'Contributed To': number;
  'Star Earned': number;
};

export type TLanguage = {
  name: string;
  size: number;
}