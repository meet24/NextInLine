import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "../utils/validation";
import { registerUser, loginUser } from "../src/api";
import { authStyles as styles } from "../styles/authStyles";
import { AsYouType } from "libphonenumber-js";
import axios from "axios";

import InputField from "./InputField";
import PhoneInputField from "./PhoneInputField";
import Header from "./Header";
import ToggleAuthLink from "./ToggleAuthLink";
import GoogleSignInButton from "./GoogleSignInButton";
import MessageBox from "./MessageBox";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { label: "", color: "", score: 0 };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", color: "red", score: 25 };
    if (score === 2 || score === 3)
      return { label: "Medium", color: "orange", score: 60 };
    return { label: "Strong", color: "green", score: 100 };
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      if (!isLogin && !emailVerified) {
        Alert.alert("Please verify your email before registering.");
        return;
      }

      const res = isLogin
        ? await loginUser({
            email: values.email,
            password: values.password,
          })
        : await registerUser(values);

      setMessage("Successfully submitted!");
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        isLogin ? loginValidationSchema : signupValidationSchema
      }
      onSubmit={handleFormSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <>
          <Header isLogin={isLogin} />

          {!isLogin && (
            <>
              <InputField
                icon="person-outline"
                placeholder="Name"
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </>
          )}

          <InputField
            icon="mail-outline"
            placeholder="Email"
            keyboardType="email-address"
            value={values.email}
            onChangeText={(text) => {
              handleChange("email")(text);
              setFieldTouched("email", true, false);
              setOtpSent(false);
              setEmailVerified(false);
              setOtp("");
              setOtpError("");
            }}
          />
          {touched.email && (
            <Text style={styles.errorText}>
              {values.email === "" ? "Email is required" : errors.email || ""}
            </Text>
          )}

          <InputField
            icon="lock-closed-outline"
            placeholder="Password"
            secureTextEntry
            isPassword
            value={values.password}
            onChangeText={(text) => {
              handleChange("password")(text);
              setFieldTouched("password", true, false);
            }}
          />
          {touched.password && (
            <Text style={styles.errorText}>
              {values.password === ""
                ? "Password is required"
                : errors.password || ""}
            </Text>
          )}

          {!isLogin && values.password !== "" && (
            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  height: 5,
                  width: "100%",
                  backgroundColor: "#ddd",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: 5,
                    width: `${getPasswordStrength(values.password).score}%`,
                    backgroundColor: getPasswordStrength(values.password).color,
                  }}
                />
              </View>
              <Text
                style={{
                  color: getPasswordStrength(values.password).color,
                  marginTop: 4,
                }}
              >
                {getPasswordStrength(values.password).label}
              </Text>
            </View>
          )}

          {!isLogin && (
            <>
              <PhoneInputField
                value={values.contactNumber}
                isValid={!errors.contactNumber}
                error={touched.contactNumber ? errors.contactNumber : ""}
                onBlur={() => setFieldTouched("contactNumber")}
                onChangeText={(text) => {
                  const formatted = new AsYouType().input(text);
                  handleChange("contactNumber")(formatted);
                }}
              />
              {touched.contactNumber && errors.contactNumber && (
                <Text style={styles.errorText}>{errors.contactNumber}</Text>
              )}
            </>
          )}

          {/* OTP Section */}
          {!isLogin && values.email && (
            <View>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: otpSent ? "#aaa" : "#007bff",
                  marginTop: 10,
                  marginBottom: 10,
                }}
                disabled={otpSent || loading}
                onPress={async () => {
                  if (!values.email.includes("@")) {
                    setMessage("Enter a valid email address");
                    return;
                  }

                  try {
                    setLoading(true);
                    await axios.post(
                      "http://localhost:3001/api/verify/send-otp",
                      {
                        email: values.email,
                      }
                    );
                    setOtpSent(true);
                    setMessage("OTP sent to your email");
                  } catch (err) {
                    setMessage("Failed to send OTP");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </Text>
              </TouchableOpacity>

              {otpSent && !emailVerified && (
                <>
                  <InputField
                    icon="key-outline"
                    placeholder="Enter OTP"
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={(text) => setOtp(text)}
                  />
                  <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: "#28a745" }}
                    onPress={async () => {
                      try {
                        const res = await axios.post(
                          "http://localhost:3001/api/verify/verify-otp",
                          {
                            email: values.email,
                            otp,
                          }
                        );
                        setEmailVerified(true);
                        setMessage("Email verified ✅");
                      } catch (err) {
                        setOtpError("Invalid or expired OTP");
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Verify OTP</Text>
                  </TouchableOpacity>
                  {otpError !== "" && (
                    <Text style={styles.errorText}>{otpError}</Text>
                  )}
                </>
              )}
            </View>
          )}

          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor:
                !isLogin && !emailVerified
                  ? "#ccc"
                  : styles.button.backgroundColor,
            }}
            onPress={() => handleSubmit()}
            disabled={!isLogin && !emailVerified}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? "Log In to Your Account" : "Create Account"}
              </Text>
            )}
          </TouchableOpacity>

          <ToggleAuthLink
            isLogin={isLogin}
            toggle={() => {
              setIsLogin(!isLogin);
              setEmailVerified(false);
              setOtpSent(false);
              setOtp("");
              setOtpError("");
              setMessage("");
            }}
          />
          <Text style={styles.title}>OR</Text>

          <GoogleSignInButton />
          <MessageBox message={message} />
        </>
      )}
    </Formik>
  );
}
