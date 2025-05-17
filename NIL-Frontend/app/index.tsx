import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
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
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

interface FormState {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [message, setMessage] = useState("");

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const handlePhoneChange = (text: string) => {
    const formatted = new AsYouType().input(text);
    setForm((prev) => ({ ...prev, contactNumber: formatted }));

    const cleaned = formatted.replace(/\s/g, ""); // remove spaces
    const phone = parsePhoneNumberFromString(cleaned);

    if (phone && phone.isValid()) {
      const national = phone.nationalNumber;
      const isTenDigit = /^\d{10}$/.test(national);

      if (isTenDigit) {
        setIsPhoneValid(true);
      } else {
        setIsPhoneValid(false);
      }
    } else {
      setIsPhoneValid(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!isLogin) {
        const phone = parsePhoneNumberFromString(form.contactNumber);
        if (!phone || !phone.isValid() || phone.nationalNumber.length !== 10) {
          setMessage("Invalid phone number format.");
          return;
        }
      }

      const res = isLogin
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);
      setMessage("Sucessfuly");
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../assets/images/logo2.png")}
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
      <Text style={styles.caption}>Please fill your information</Text>

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

      <View style={styles.inputContainer}>
        <Ionicons
          name="call-outline"
          size={20}
          color={isPhoneValid ? "#ccc" : "red"}
          style={styles.icon}
        />
        <TextInput
          placeholder="+1234567890"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="phone-pad"
          value={form.contactNumber}
          onChangeText={handlePhoneChange}
        />
      </View>
      {!isPhoneValid && (
        <Text style={{ color: "red", marginTop: 5, marginLeft: 10 }}>
          Enter a valid number with exactly 10 digits after country code.
        </Text>
      )}

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

      <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
        <Ionicons
          name="logo-google"
          size={20}
          color="#000"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      {message !== "" && (
        <Text style={{ color: "green", marginTop: 20, textAlign: "center" }}>
          {message}
        </Text>
      )}
    </View>
  );
}
