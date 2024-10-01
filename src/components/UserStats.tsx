import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';

import { TUserStats } from '@/src/types';

type TUserStatsProps = {
  stats: TUserStats;
};

const UserStats: React.FC<TUserStatsProps> = ({ stats }) => {
  const renderStatItem: ListRenderItem<[string, number]> = ({ item: [key, value] }) => {
    return (
      <View className="bg-gray-800 flex-1 mx-2 items-center py-3 rounded-md border-2 border-gray-700">
        <Text className="font-[Electrolize] text-xl font-bold md:text-2xl text-gray-200">{value}</Text>
        <Text className="-mt-1 text-sm text-gray-400 md:text-base">{key}</Text>
      </View>
    );
  };

  return (
    <View className="rounded-md border border-gray-700 bg-gray-900 shadow-lg shadow-black">
      <View className="bg-gray-800 px-5 py-3">
        <Text className="text-xl font-semibold text-gray-200">GitHub Stats</Text>
      </View>

      <View className="bg-gray-800/50 py-3 px-1">
        <FlatList
          data={Object.entries(stats)}
          keyExtractor={([key]) => key}
          numColumns={2}
          renderItem={renderStatItem}
          scrollEnabled={false}
          contentContainerClassName="gap-4"
        />
      </View>
    </View>
  );
};

export default UserStats;
