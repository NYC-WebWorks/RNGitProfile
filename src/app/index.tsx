import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [name, setName] = useState("");

  const onSearch = () => {
    router.push(`/${name}`);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameInput}
        placeholder="Enter GitHub Username"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  nameInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  searchBtn: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 40,
  },
});
