import React from "react";
import { View, Image, Text } from "react-native";
import { authStyles as styles } from "../styles/authStyles";

interface Props {
  isLogin: boolean;
}

export default function Header({ isLogin }: Props) {
  return (
    <>
      <Image
        source={require("../assets/images/logo2.png")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      <Text style={styles.title}>{isLogin ? "Welcome Back!" : "Join Us!"}</Text>
      <Text style={styles.subtitle}>
        {isLogin
          ? "We're glad to see you again"
          : "Create an account to get started"}
      </Text>
      <Text style={styles.caption}>
        {isLogin
          ? "Enter your credentials to continue"
          : "It only takes a few seconds"}
      </Text>
    </>
  );
}
