import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "../utils/validation";
import { loginUser } from "../src/api";
import { authStyles as styles } from "../styles/authStyles";
import { AsYouType } from "libphonenumber-js";
import axios from "axios";
import { useRouter } from "expo-router";

import InputField from "./InputField";
import PhoneInputField from "./PhoneInputField";
import Header from "./Header";
import ToggleAuthLink from "./ToggleAuthLink";
import GoogleSignInButton from "./GoogleSignInButton";
import MessageBox from "./MessageBox";
import { API_BASE_URL } from "../src/constants";

const AuthForm: React.FC = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
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
      if (!isLogin) {
        setMessage("Please verify your email before registering.");
        return;
      }

      await loginUser({
        email: values.email,
        password: values.password,
      });
      router.replace("/home" as any);
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
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
                  }}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
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
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {!isLogin && values.password !== "" && (
                  <View style={{ marginBottom: 10 }}>
                    <View
                      style={{
                        height: 5,
                        width: "100%",
                        backgroundColor: "#ddd",
                        borderRadius: 5,
                      }}
                    >
                      <View
                        style={{
                          height: 5,
                          width: `${
                            getPasswordStrength(values.password).score
                          }%`,
                          backgroundColor: getPasswordStrength(values.password)
                            .color,
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
                      <Text style={styles.errorText}>
                        {errors.contactNumber}
                      </Text>
                    )}
                  </>
                )}

                {!isLogin && values.email && (
                  <View>
                    <TouchableOpacity
                      style={{
                        ...styles.button,
                        backgroundColor: "#007bff",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      onPress={async () => {
                        if (!values.email.includes("@")) {
                          setMessage("Enter a valid email address");
                          return;
                        }

                        try {
                          setLoading(true);
                          await axios.post(
                            `${API_BASE_URL}/api/verify/send-otp`,
                            { email: values.email }
                          );

                          setMessage("OTP sent to your email");
                          router.push({
                            pathname: "/otp-verification",
                            params: { user: JSON.stringify(values) },
                          });
                        } catch (err) {
                          console.log(err);
                          setMessage("Failed to send OTP");
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Send OTP</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {isLogin && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                    disabled={!isLogin && loading}
                  >
                    <Text style={styles.buttonText}>
                      Log In to Your Account
                    </Text>
                  </TouchableOpacity>
                )}

                <ToggleAuthLink
                  isLogin={isLogin}
                  toggle={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                  }}
                />
                <Text style={styles.title}>OR</Text>

                <GoogleSignInButton />
                <MessageBox message={message} />
              </>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
