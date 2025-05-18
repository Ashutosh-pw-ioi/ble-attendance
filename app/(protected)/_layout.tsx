import { useAuth } from "@/store/authContext";
import { Redirect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";

import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Colors, FontWeight } from "@/styles";

export default function ProtectedLayout() {
  const authState = useAuth();

  if (!authState.isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: styles.drawerHeader,
          headerTintColor: Colors.textPrimary,
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          drawerStyle: styles.drawerStyle,
          drawerInactiveTintColor: Colors.textSecondary,
          drawerHideStatusBarOnOpen: true,
        }}
      >
        <Drawer.Screen
          name={"index"}
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name={"attendance"}
          options={{
            drawerLabel: "Attendance",
            title: "Attendance",
          }}
        />
        <Drawer.Screen
          name={"setting"}
          options={{
            drawerLabel: "Setting",
            title: "Setting",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: Colors.background,
  },
  drawerHeader: {
    backgroundColor: "#1E293B",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: FontWeight.SemiBold,
  },
});
