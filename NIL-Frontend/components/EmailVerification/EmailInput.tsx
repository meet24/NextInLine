import React from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import axios from "axios";

export default function EmailInput({
  email,
  onSent,
}: {
  email: string;
  onSent: () => void;
}) {
  const handleSendOtp = async () => {
    try {
      await axios.post("http://loclahost:3001/api/send-otp", { email });
      Alert.alert("OTP Sent", `OTP sent to ${email}`);
      onSent();
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.msg || "Failed to send OTP");
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleSendOtp}
        style={{ padding: 10, backgroundColor: "#007bff" }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Send OTP to {email}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
