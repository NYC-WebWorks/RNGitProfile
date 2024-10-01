import emoji from 'emoji-dictionary';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

import { TUserProfile } from '@/src/types';
import Ionicons from '@expo/vector-icons/Ionicons';

type TUserInfoProps = TUserProfile & {
  username: string;
};

const UserInfo: React.FC<TUserInfoProps> = ({ username, avatarUrl, status, name, bio, createdAt }) => {
  return (
    <View className="mx-auto flex max-w-screen-lg flex-col items-center justify-evenly gap-4 pb-6 md:flex-row md:gap-14 mt-4">
      <View className="relative size-36 flex-none rounded-full border-4 border-gray-600 md:size-48">
        <Image
          className="rounded-full w-full h-full"
          source={avatarUrl}
          alt={username}
          // placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        {status?.emoji && (
          <View className="absolute bottom-[10%] right-[10%] translate-x-1/2 ">
            <View className="grid size-10 items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-xl md:text-2xl md:size-12">
              <Text className="text-2xl">{emoji.getUnicode(status.emoji)}</Text>
            </View>
          </View>
        )}
      </View>
      <View className="flex">
        <Text className="text-gradient text-center md:text-left text-4xl font-bold md:text-6xl text-black dark:text-neutral-200">
          {name || username}
        </Text>
        <Text className="text-gray-400 text-center md:text-left md:mb-1 md:text-3xl">@{username}</Text>

        <View className="mb-3 flex-row items-center justify-center md:justify-start gap-2">
          <Ionicons className="text-black dark:text-neutral-200" name="calendar-clear" size={18} />
          <Text className="text-black dark:text-neutral-200 text-center md:text-left">
            Joined on{' '}
            <Text className="text-black dark:text-neutral-200 font-medium">
              {new Date(createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </Text>
        </View>

        <Text className="mt-auto md:line-clamp-2 text-center md:text-left md:text-base text-sm text-neutral-500 md:max-w-lg">{bio}</Text>
      </View>
    </View>
  );
};

export default UserInfo;
