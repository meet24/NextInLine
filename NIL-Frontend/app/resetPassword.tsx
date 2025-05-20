import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { email } = useLocalSearchParams(); // Get email passed from OTP page

  const handleResetPassword = async () => {
    if (!email || !password) {
      setMsg("Missing email or password");
      return;
    }

    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_FRONTEND_URL}:3001/api/reset`,
        {
          email,
          newPassword: password,
        }
      );

      router.replace("/");
    } catch (err: any) {
      setMsg("Error occured");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293443",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#3564ff",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
