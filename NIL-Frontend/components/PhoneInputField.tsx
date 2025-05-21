import React from "react";
import { View, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authStyles as styles } from "../styles/authStyles";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  isValid?: boolean;
  error?: string;
  onBlur?: () => void;
}

export default function PhoneInputField({
  value,
  onChangeText,
  isValid = true,
  error,
  onBlur,
}: Props) {
  return (
    <>
      <View style={styles.inputContainer}>
        <Ionicons
          name="call-outline"
          size={20}
          color={isValid ? "#ccc" : "red"}
          style={styles.icon}
        />
        <TextInput
          placeholder="+1234567890"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
    </>
  );
}
