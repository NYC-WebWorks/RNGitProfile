import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';

import { TLanguage } from '@/src/types';

type TLanguagesProps = {
  languages: TLanguage[];
};

const Languages: React.FC<TLanguagesProps> = ({ languages }) => {
  const renderLanguageItem: ListRenderItem<TLanguage> = ({ item: { name, size } }) => {
    return (
      <View key={name} className="bg-gray-800 flex-1 mx-2 items-center justify-around  py-3 rounded-md border-2 border-gray-700">
        {/* <LanguageIcon
          name={name}
          className="size-8 transition-all duration-300 group-hover:grayscale-0 group-hover:rotate-y-180 md:size-10"
        /> */}
        <View className="items-center">
          <Text className="font-[Electrolize] text-xl font-bold md:text-xl text-neutral-300">
            {size}
            <Text className="ml-1 text-sm md:text-lg">%</Text>
          </Text>
          <Text className="-mt-1 text-lg text-gray-400 md:text-base">{name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="rounded-md border border-gray-700 bg-gray-900 shadow-lg shadow-black">
      <View className="bg-gray-800 px-5 py-3">
        <Text className="text-xl font-semibold text-gray-200">Most Used Languages</Text>
      </View>

      <View className="bg-gray-800/50 py-3 px-1">
        <FlatList
          data={languages}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={renderLanguageItem}
          scrollEnabled={false}
          contentContainerClassName="gap-4"
        />
      </View>
    </View>
  );
};

export default Languages;
