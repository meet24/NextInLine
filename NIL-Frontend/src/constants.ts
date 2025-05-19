import { Platform } from "react-native";

export const API_BASE_URL = Platform.select({
  ios: "http://localhost:3001",
  android: `${process.env.EXPO_PUBLIC_FRONTEND_URL}:3001`, // replace with your actual IP
});
