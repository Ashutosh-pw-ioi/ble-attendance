import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import AuthProvider from "@/store/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style={"light"} />
      <Stack>
        <Stack.Screen
          name={"(protected)"}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={"login"}
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
    </AuthProvider>
  );
}
