import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import LoadingOverlay from '@/src/components/LoadingOverlay';
import apiClient from '@/src/config/apiClient';

const queryUser = `
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

export default function Index() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const { username } = useLocalSearchParams();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      console.log(
        "process.env.GITHUB_TOKEN",
        process.env.EXPO_PUBLIC_GITHUB_TOKEN
      );
      console.log("username", username);
      const { user } = await apiClient({
        query: queryUser,
        variables: {
          username,
        },
      });

      setLoading(false);
      console.log("user from api", user);
    };

    loadProfile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <LoadingOverlay />}
      <Text>User {username}</Text>
    </View>
  );
}
