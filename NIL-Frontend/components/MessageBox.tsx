import React from "react";
import { Text } from "react-native";

export default function MessageBox({ message }: { message: string }) {
  return message ? (
    <Text style={{ color: "green", marginTop: 20, textAlign: "center" }}>
      {message}
    </Text>
  ) : null;
}
