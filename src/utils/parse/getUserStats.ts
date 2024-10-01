import { TUserData, TUserStats } from '@/src/types';

const getUserStats = (userData: TUserData) => {
  const stats = {
    Followers: userData.followers.totalCount,
    Repositories: userData.repositoriesWithStargazerCount.totalCount,
    Organizations: userData.organizations.totalCount,
    Gists: userData.gists.totalCount,
    'Pull Requests': userData.pullRequests.totalCount,
    Issues: userData.issues.totalCount,
    Commits: userData.contributionsCollection.totalCommitContributions,
    Sponsors: userData.sponsors.totalCount,
    'Contributed To': userData.repositoriesContributedTo.totalCount,
    'Star Earned': userData.repositoriesWithStargazerCount.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0),
  };

  return stats as TUserStats;
};

export default getUserStats;
