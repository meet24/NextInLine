import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293443",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  logo: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: 0,
    marginTop: 10,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  caption: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: 30,
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
  },
  button: {
    backgroundColor: "#3564ff",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  message: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  googleButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom:10,
  },
  googleButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
  color: "brown",
  fontSize: 12,
  marginTop: 4,
  marginLeft: 10,
},
screenContainer: {
    flex: 1,
    backgroundColor: "#293443",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  footerWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },

});
