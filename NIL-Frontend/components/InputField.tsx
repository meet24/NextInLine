import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardTypeOptions } from "react-native";
import { authStyles as styles } from "../styles/authStyles";

interface InputFieldProps {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  isValid?: boolean;
  error?: string;
  value?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function InputField({
  icon,
  placeholder,
  secureTextEntry = false,
  isPassword = false,
  isValid = true,
  value,
  error,
  onChangeText,
  onBlur,
  keyboardType = "default",
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name={icon}
        size={20}
        color={isValid ? "#ccc" : "red"}
        style={styles.icon}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry={isPassword && !showPassword}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />

      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#888"
            style={{ paddingLeft: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     color: "#fff",
//   },
// });

// import React from "react";
// import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { KeyboardTypeOptions } from "react-native";

// interface InputFieldProps {
//   icon: keyof typeof Ionicons.glyphMap;
//   placeholder: string;
//   secureTextEntry?: boolean;
//   isPassword?: boolean;
//   value?: string;
//   onChangeText: (text: string) => void;
//   onBlur?: () => void;
//   keyboardType?: KeyboardTypeOptions;
// }

// export default function InputField({
//   icon,
//   placeholder,
//   secureTextEntry = false,
//   isPassword = false,
//   value,
//   onChangeText,
//   onBlur,
//   keyboardType = "default",
// }: InputFieldProps) {
//   return (
//     <View style={styles.inputContainer}>
//       <Ionicons name={icon} size={20} color="#ccc" style={styles.icon} />
//       <TextInput
//         placeholder={placeholder}
//         placeholderTextColor="#aaa"
//         style={styles.input}
//         secureTextEntry={secureTextEntry || isPassword}
//         value={value}
//         onChangeText={onChangeText}
//         onBlur={onBlur}
//         keyboardType={keyboardType}
//         autoCapitalize="none"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     color: "#fff",
//   },
// });
