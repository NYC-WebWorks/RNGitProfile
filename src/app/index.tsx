import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';

export default function Index() {
  // const [name, setName] = useState("zhen1007");
  const [name, setName] = useState('torvalds');

  const onSearch = () => {
    router.push(`/${name}`);
  };

  return (
    <View className="flex-1 justify-center px-5 gap-5">
      <TextInput className="border-2 rounded-md p-2" placeholder="Enter GitHub Username" value={name} onChangeText={setName} />
      <Pressable className="py-3 items-center bg-green-500 rounded-full" onPress={onSearch}>
        <Text className="text-lg">Search</Text>
      </Pressable>
    </View>
  );
}
