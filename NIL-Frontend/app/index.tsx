import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { registerUser, loginUser } from "../src/api";
import { authStyles as styles } from "../styles/authStyles";
interface FormState {
  name: string;
  email: string;
  password: string;
}

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = isLogin
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../assets/images/logo.png")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 30,
        }}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>{isLogin ? "Sign in" : "Register"}</Text>
      <Text style={styles.caption}>Please fill your informations</Text>

      {!isLogin && (
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#ccc"
            style={styles.icon}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            style={styles.input}
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#ccc"
          style={styles.icon}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#ccc"
          style={styles.icon}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? "Sign in now" : "Register now"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.link}>
          {isLogin ? "No account? Sign up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>

      {isLogin && <Text style={styles.message}>{message}</Text>}

      <TouchableOpacity style={styles.googleButton}>
        <Ionicons
          name="logo-google"
          size={20}
          color="#000"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
