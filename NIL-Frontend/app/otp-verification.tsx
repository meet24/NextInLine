import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { registerUser } from "../src/api";
import { useAuth } from "../src/AuthContext";

type initialValues = {
  name?: string;
  email?: string;
  password?: string;
  contactNumber?: string;
};

export default function OTPVerificationScreen() {
  const { login } = useAuth();
  const { user: userParam, path } = useLocalSearchParams();
  const user = JSON.parse(userParam as string) as initialValues;

  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const code = otp.join("");
    if (code.length < 6 || otp.includes("")) {
      Alert.alert("Error", "Please enter the full 6-digit OTP");
      return;
    }

    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_FRONTEND_URL}:3001/api/verify-otp`,
        {
          email: user.email,
          otp: code,
        }
      );
      console.log(path);
      if (path === "Register") {
        await registerUser(user);
        login();
        router.replace("/");
      } else if (path === "Forgot") {
        router.replace({
          pathname: "/resetPassword" as any,
          params: { email: user.email },
        });
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.msg ||
        err?.message ||
        "OTP verification or registration failed.";
      Alert.alert("Error", msg);
      console.log("OTP/Registration Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the OTP</Text>
      <Text style={styles.subtitle}>Sent to {user.email}</Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293443",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 100,
    marginBottom: 30,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
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
