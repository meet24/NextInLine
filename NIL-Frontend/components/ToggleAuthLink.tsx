import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { authStyles as styles } from "../styles/authStyles";

interface Props {
  isLogin: boolean;
  toggle: () => void;
}

export default function ToggleAuthLink({ isLogin, toggle }: Props) {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={toggle}
        hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
      >
        <Text style={styles.link}>
          {isLogin
            ? "New here? Create an account"
            : "Have an account? Log in instead"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
