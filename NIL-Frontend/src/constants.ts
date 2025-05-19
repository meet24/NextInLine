import { Platform } from "react-native";

export const API_BASE_URL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://192.168.2.42:3001", // replace with your actual IP
});
