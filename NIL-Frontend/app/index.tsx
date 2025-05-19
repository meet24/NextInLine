import React from "react";
import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { authStyles as styles } from "../styles/authStyles";
import AuthForm from "../components/AuthForm";

export default function Index() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar hidden />
      <View style={styles.container}>
        <AuthForm />
      </View>
    </KeyboardAvoidingView>
  );
}
