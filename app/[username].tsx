import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default function Index() {
  const [name, setName] = useState("");

  const {username} = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>User {username}</Text>
    </View>
  );
}
