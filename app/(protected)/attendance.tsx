import { Text, View, StyleSheet } from "react-native";

import { Colors } from "@/styles";

export default function Attendance() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Attendance screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.textPrimary,
  },
});
