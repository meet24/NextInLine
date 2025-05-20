import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "../src/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Slot />
    </AuthProvider>
  );
}
