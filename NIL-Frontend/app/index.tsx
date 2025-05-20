import React from "react";
import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { authStyles as styles } from "../styles/authStyles";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../src/AuthContext";
import TabNavigator from "../Navigation/TabNavigator";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar hidden />
      <View style={styles.container}>
        {isAuthenticated ? <TabNavigator /> : <AuthForm />}
      </View>
    </KeyboardAvoidingView>
  );
}
