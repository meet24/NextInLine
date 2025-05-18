import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authStyles as styles } from "../styles/authStyles";

export default function GoogleSignInButton() {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
      <Ionicons
        name="logo-google"
        size={20}
        color="#000"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
