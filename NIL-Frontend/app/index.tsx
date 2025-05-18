// import React from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   View,
// } from "react-native";
// import { authStyles as styles } from "../styles/authStyles";
// import AuthForm from "../components/AuthForm";

// export default function Index() {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <StatusBar hidden />

//       <View style={styles.screenContainer}>
//         {/* Top Logo */}
//         <View style={styles.logoWrapper}>
//           {/* <Image source={...} style={{ width: 100, height: 100 }} /> */}
//         </View>

//         {/* Form area (scrolls if needed) */}
//         <ScrollView
//           style={{ flex: 1 }}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           <AuthForm />
//         </ScrollView>

//         {/* Google Button or Footer */}
//         <View style={styles.footerWrapper}>{/* Google button here */}</View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// import React from "react";
// import { StatusBar, View, KeyboardAvoidingView, Platform } from "react-native";
// import { authStyles as styles } from "../styles/authStyles";
// import AuthForm from "../components/AuthForm";

// export default function Index() {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={{ flex: 1 }}
//     >
//       <StatusBar hidden />
//       <View style={styles.container}>
//         <AuthForm />
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

import React from "react";
import { View, StatusBar } from "react-native";
import { authStyles as styles } from "../styles/authStyles";
import AuthForm from "../components/AuthForm";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AuthForm />
    </View>
  );
}
