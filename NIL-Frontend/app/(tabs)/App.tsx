import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { registerUser, loginUser } from "../../src/api";

interface FormState {
  name: string;
  email: string;
  password: string;
}

export default function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = isLogin
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);

      const userName = res?.data?.user?.name || "";
      setMessage(isLogin ? `Welcome ${userName}` : "Registered!");
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(text) => handleChange("name", text)}
        />
      )}
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(text) => handleChange("password", text)}
      />
      <Button title={isLogin ? "Login" : "Register"} onPress={handleSubmit} />
      <Text onPress={() => setIsLogin(!isLogin)} style={styles.link}>
        {isLogin ? "No account? Register" : "Already have an account? Login"}
      </Text>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
    borderRadius: 5,
  },
  link: { color: "blue", marginTop: 10 },
});