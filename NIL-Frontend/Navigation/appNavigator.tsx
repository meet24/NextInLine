import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthForm from "../components/AuthForm";
import OTPVerificationScreen from "../app/otp-verification";

export type RootStackParamList = {
  Auth: undefined;
  OTPVerification: { email: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthForm} />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
