import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293443",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  logo: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    marginTop: 30,
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
    marginTop: 50,
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
  },
  googleButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
