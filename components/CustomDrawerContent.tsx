import { View, StyleSheet, Pressable, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "@/store/authContext";
import { Colors, Spacing, FontWeight } from "@/styles";

export default function CustomDrawerContent(props: any) {
  const authState = useAuth();

  function handleLogout() {
    authState.logout();
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <View style={{ borderRadius: 999, overflow: "hidden" }}>
          <Pressable
            onPress={handleLogout}
            android_ripple={{ color: "#404040" }}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && { opacity: 0.5 },
            ]}
          >
            <MaterialIcons name="logout" size={24} color={Colors.textPrimary} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: "auto",
    padding: Spacing.sm,
    paddingBottom: Spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  logoutButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  logoutText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: FontWeight.SemiBold,
  },
});
