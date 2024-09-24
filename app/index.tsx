import { router } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Index() {
  const [name, setName] = useState("");

  const onSearch = () => {
    router.push(`/${name}`);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <TextInput style={styles.nameInput} value={name} onChangeText={setName} />
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={onSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});
