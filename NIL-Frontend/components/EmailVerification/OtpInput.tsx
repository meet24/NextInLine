import React from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import axios from "axios";

export default function OtpInput({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) {
  const [otp, setOtp] = React.useState("");

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:3001/api/verify/verify-otp", {
        email,
        otp,
      });
      Alert.alert("Verified", "Email verified successfully!");
      onVerified();
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <View>
      <Text>Enter OTP sent to {email}</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="123456"
        maxLength={6}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TouchableOpacity
        onPress={handleVerify}
        style={{ backgroundColor: "#28a745", padding: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
