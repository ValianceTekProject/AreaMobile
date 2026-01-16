import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import {
  TextInput,
  Button,
  Divider,
  Text,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { router } from "expo-router";
import { apiClient } from "@/utils/apiClient";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(
        "/auth/login",
        JSON.stringify({ email, password }),
      );

      await apiClient.setToken(response.token);

      await signIn(response.token, { email });

      Alert.alert("Success", "Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(
        "/auth/register",
        JSON.stringify({ email, password }),
      );

      await apiClient.setToken(response.token);

      await signIn(response.token, { email });

      Alert.alert("Success", "Account created and logged in!");
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert("Error", "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isRegisterMode ? "Register" : "Login"}
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={() => router.back()}
            iconColor="#fff"
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={loading}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            disabled={loading}
          />

          <Button
            mode="contained"
            onPress={isRegisterMode ? handleRegister : handleLogin}
            style={styles.loginButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : isRegisterMode ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </Button>

          <Button
            mode="text"
            onPress={() => setIsRegisterMode(!isRegisterMode)}
            disabled={loading}
            style={styles.toggleButton}
          >
            {isRegisterMode
              ? "Already have an account? Sign In"
              : "Don't have an account? Register"}
          </Button>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    maxHeight: "80%",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 24,
    paddingTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  toggleButton: {
    marginBottom: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#999",
    fontSize: 14,
  },
  oauthButton: {
    marginBottom: 12,
  },
});
