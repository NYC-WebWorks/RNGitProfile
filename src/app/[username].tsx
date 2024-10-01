import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import LoadingOverlay from '@/src/components/LoadingOverlay';
import UserInfo from '@/src/components/UserInfo';
import apiClient from '@/src/config/apiClient';
import { TFollowUp, TUserData, TUserProfile } from '@/src/types';
import getCommitsPerRepo from '@/src/utils/parse/getCommitsPerRepo';
import getContributionCalendar from '@/src/utils/parse/getContributionCalendar';
import getFollowUp from '@/src/utils/parse/getFollowUp';
import getLanguageSize from '@/src/utils/parse/getLanguageSize';
import getReposPerLanguage from '@/src/utils/parse/getReposPerLanguage';
import getStarsPerLanguage from '@/src/utils/parse/getStarsPerLanguage';
import getStarsPerRepo from '@/src/utils/parse/getStarsPerRepo';
import getUserStats from '@/src/utils/parse/getUserStats';
import UserStats from '../components/UserStats';
import Languages from '../components/Languages';

const queryUserProfile = `
  query ($username: String!) {
    user(login: $username) {
      name
      avatarUrl
      bio
      company
      createdAt
      location
      url
      twitterUsername
      websiteUrl
      status {
        emojiHTML
        emoji
        message
      }
      socialAccounts(first: 5) {
        nodes {
          displayName
          provider
          url
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(
        first: 1
        ownerAffiliations: OWNER
      ) {
        totalCount
      }
    }
  }
`;

const repositoriesQuery = `
  repositories(
    ownerAffiliations: OWNER
    isFork: false
    first: 10
    orderBy: {field: STARGAZERS, direction: DESC}
  ) {
    nodes {
      name
      stargazerCount
      defaultBranchRef {
        target {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
      }
      languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
        edges {
          size
          node {
            name
          }
        }
      }
    }
  }
`;

const popularRepositoriesQuery = `
popularRepositories: repositories(
  first: 6
  isFork: false
  ownerAffiliations: OWNER
  orderBy: {direction: DESC, field: STARGAZERS}
) {
  nodes {
    name
    description
    stargazerCount
    forkCount
    diskUsage
    url
    createdAt
    primaryLanguage {
      name
      color
    }
    issues{
      totalCount
    }
    pullRequests{
      totalCount
    }
  }
}
`;

const contributionsCollectionQuery = `
contributionsCollection {
  pullRequestContributionsByRepository {
    contributions(last: 10) {
      totalCount
      nodes {
        pullRequest {
          id
          url
          title
          state
        }
      }
    }
    repository {
      name
    description
    stargazerCount
    forkCount
    diskUsage
    url
    createdAt
    primaryLanguage {
      name
      color
    }
    owner{
      avatarUrl(size: 50)
      url
      login
    }
    }
  }
  contributionCalendar {
    weeks {
      contributionDays {
        contributionCount
        contributionLevel
        date
      }
    }
  }
}
`;

const userStatsQuery = `
  following {
    totalCount
  }
  followers {
    totalCount
  }
  gists {
    totalCount
  }
  contributionsCollection {
    totalCommitContributions
  }
  repositoriesContributedTo(
    first: 1
    contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
  ) {
    totalCount
  }
  pullRequests(first: 1) {
    totalCount
  }
  issues(first: 1) {
    totalCount
  }
  organizations(first: 1) {
    totalCount
  }
  sponsoring(first: 1) {
    totalCount
  }
  sponsors{
    totalCount
  }
  createdAt
  updatedAt
  repositoriesWithStargazerCount: repositories(
    first: 100
    ownerAffiliations: OWNER
    orderBy: {field: STARGAZERS, direction: DESC}
  ) {
    totalCount
    nodes {
      stargazerCount
    }
  }
`;

const followupQuery = (login: string) => {
  return `
issues_open_by:search(query: "is:issue author:${login} is:open", type: ISSUE, first: 0) {
  issueCount
}
issues_drafts_by:search(query: "is:issue author:${login} draft:true", type: ISSUE, first: 0) {
  issueCount
}
issues_skipped_by:search(query: "is:issue author:${login} is:closed label:wontfix,duplicate", type: ISSUE, first: 0) {
  issueCount
}
issues_closed_by:search(query: "is:issue author:${login} is:closed", type: ISSUE, first: 0) {
  issueCount
}
pr_open_by:search(query: "is:pr author:${login} is:open draft:false", type: ISSUE, first: 0) {
  issueCount
}
pr_drafts_by:search(query: "is:pr author:${login} draft:true", type: ISSUE, first: 0) {
  issueCount
}
pr_closed_by:search(query: "is:pr author:${login} is:unmerged is:closed draft:false", type: ISSUE, first: 0) {
  issueCount
}
pr_merged_by:search(query: "is:pr author:${login} is:merged", type: ISSUE, first: 0) {
  issueCount
}

issues_open_on:search(query: "user:${login} is:issue is:open", type: ISSUE, first: 0) {
  issueCount
}
issues_drafts_on:search(query: "user:${login} is:issue draft:true", type: ISSUE, first: 0) {
  issueCount
}
issues_skipped_on:search(query: "user:${login} is:issue is:closed label:wontfix,duplicate", type: ISSUE, first: 0) {
  issueCount
}
issues_closed_on:search(query: "user:${login} is:issue is:closed", type: ISSUE, first: 0) {
  issueCount
}
pr_open_on:search(query: "user:${login} is:pr is:open draft:false", type: ISSUE, first: 0) {
  issueCount
}
pr_drafts_on:search(query: "user:${login} is:pr draft:true", type: ISSUE, first: 0) {
  issueCount
}
pr_closed_on:search(query: "user:${login} is:pr is:unmerged is:closed draft:false", type: ISSUE, first: 0) {
  issueCount
}
pr_merged_on:search(query: "user:${login} is:pr is:merged", type: ISSUE, first: 0) {
  issueCount
}

`;
};

const a = {
  avatarUrl: 'https://avatars.githubusercontent.com/u/172377045?v=4',
  bio: 'Senior 🌏Web / 📱Mobile Developer Proficient in React and React Native.',
  company: null,
  createdAt: '2024-06-11T09:25:08Z',
  followers: { totalCount: 21 },
  following: { totalCount: 36 },
  location: null,
  name: null,
  repositories: { totalCount: 38 },
  socialAccounts: { nodes: [] },
  status: { emojiHTML: '<div>🏠</div>', message: 'Working from home' },
  twitterUsername: null,
  url: 'https://github.com/zhen1007',
  websiteUrl: null,
};

export default function Index() {
  const [userProfile, setUserProfile] = useState<TUserProfile>();
  const [userData, setUserData] = useState<TUserData>();
  const [followUp, setFollowUp] = useState<TFollowUp>();
  const [loading, setLoading] = useState(true);

  const { username } = useLocalSearchParams();

  const {
    languagesSize,
    commitsPerRepo,
    starsPerRepo,
    reposPerLanguages,
    starsPerLanguages,
    contributionCalendar,
    popularRepositories,
    userStats,
    topContributions,
  } = useMemo(() => {
    if (userData) {
      const repositories = userData?.repositories?.nodes;

      const languagesSize = getLanguageSize(repositories);
      const commitsPerRepo = getCommitsPerRepo(repositories);
      const starsPerRepo = getStarsPerRepo(repositories);
      const reposPerLanguages = getReposPerLanguage(repositories);
      const starsPerLanguages = getStarsPerLanguage(repositories);
      const contributionCalendar = getContributionCalendar(userData?.contributionsCollection);
      const popularRepositories = userData.popularRepositories.nodes;
      const userStats = getUserStats(userData);

      const topContributions = userData.contributionsCollection.pullRequestContributionsByRepository
        .filter(contribution => contribution.repository.owner.login !== (username as string))
        .splice(0, 9);

      return {
        languagesSize,
        commitsPerRepo,
        starsPerRepo,
        reposPerLanguages,
        starsPerLanguages,
        contributionCalendar,
        popularRepositories,
        userStats,
        topContributions,
      };
    } else {
      return {
        languagesSize: null,
        commitsPerRepo: null,
        starsPerRepo: null,
        reposPerLanguages: null,
        starsPerLanguages: null,
        contributionCalendar: null,
        popularRepositories: null,
        userStats: null,
        topContributions: null,
      };
    }
  }, [userData]);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      console.log('username', username);
      const { user: _userProfile } = await apiClient({
        query: queryUserProfile,
        variables: {
          username,
        },
      });
      setUserProfile(_userProfile);

      const queryUserData = `
        query ($username: String!) {
          user(login: $username) {
            ${userStatsQuery}
            ${repositoriesQuery}
            ${popularRepositoriesQuery}
            ${contributionsCollectionQuery}
          }
          ${followupQuery(username as string)}
          rateLimit{
            cost
            limit
            remaining
            used
            resetAt
          }
        }
      `;

      const { user: _userData, ...response } = await apiClient({
        query: queryUserData,
        variables: {
          username,
        },
      });
      setUserData(_userData);
      // console.log('_userData', JSON.stringify(_userData));

      const _followUp = getFollowUp(response, username);
      setFollowUp(_followUp);

      setLoading(false);
    };

    loadProfile();
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-[#18181b]">
      <Stack.Screen
        options={{
          headerTitle: props => <Text className="text-2xl font-semibold text-black dark:text-white">{username}</Text>,
        }}
      />
      {loading && <LoadingOverlay />}
      <ScrollView className="mx-auto max-w-screen-xl space-y-8 px-3 pb-10 md:space-y-16">
        {userProfile && <UserInfo username={username as string} {...userProfile} />}
        {userData && (
          <View className="gap-4">
            {userStats && <UserStats stats={userStats} />}
            {languagesSize && <Languages languages={languagesSize} />}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
