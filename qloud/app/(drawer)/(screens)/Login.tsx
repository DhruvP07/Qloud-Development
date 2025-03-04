import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { forgotPassword } from "../../services/apiService";
import axios, { AxiosError } from "axios";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      console.log("Logging in with:", email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/Home");
    } catch (error) {
      Alert.alert("Error", "Login failed!");
    }
  };


  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset password.");
      return;
    }

    try {
      await forgotPassword(email);
      Alert.alert("Success", "Password reset link sent.");
    } catch (error: any) {  // TypeScript now ensures error has a `message` property
      Alert.alert("Error", error.message || "Failed to send reset link.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>QLOUD</Text>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.subtitle}>We’re excited to see you again!</Text>

      <Text style={styles.label}>Enter credentials to log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Continue With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton}>
        <Text style={styles.socialText}>Continue With Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  forgotPassword: {
    color: "#1E90FF",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginBottom: 10,
  },
  googleText: {
    color: "black",
    fontWeight: "bold",
  },
  facebookButton: {
    width: "100%",
    backgroundColor: "#1877F2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  socialText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
