import { Stack } from "expo-router";
import ClickCountProvider from "./ClickCountContext";

export default function RootLayout() {
  return (
    <ClickCountProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {" "}
        {/* Main Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Fallback or additional screens */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ClickCountProvider>
  );
}
