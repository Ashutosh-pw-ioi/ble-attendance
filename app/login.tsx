import { Button, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/store/authContext";
import { Colors } from "@/styles";

export default function Login() {
  const authState = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login screen</Text>
      <Button
        title="Login"
        onPress={() => {
          authState.login();
        }}
      />
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
