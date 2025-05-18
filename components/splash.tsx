import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/styles";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash-icon.png")}
        style={styles.logo}
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
  logo: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },
});
