import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  IconButton,
} from "react-native-paper";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const SERVER_URL_KEY = "serverUrl";
const DEFAULT_API_URL = "http://192.168.1.41:8080";

export default function ServerSettingsScreen() {
  const [serverUrl, setServerUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurrentUrl();
  }, []);

  const loadCurrentUrl = async () => {
    try {
      const url = await SecureStore.getItemAsync(SERVER_URL_KEY);
      setServerUrl(url || DEFAULT_API_URL);
    } catch (error) {
      console.error("Error loading server URL:", error);
      setServerUrl(DEFAULT_API_URL);
    }
  };

  const validateUrl = (url: string): boolean => {
    try {
      const urlPattern = /^https?:\/\/.+/;
      return urlPattern.test(url);
    } catch {
      return false;
    }
  };

  const handleSaveUrl = async () => {
    if (!serverUrl) {
      Alert.alert("Error", "Please enter a server URL");
      return;
    }

    if (!validateUrl(serverUrl)) {
      Alert.alert(
        "Error",
        "Please enter a valid URL (e.g., http://192.168.1.41:8080)",
      );
      return;
    }

    setLoading(true);

    try {
      await SecureStore.setItemAsync(SERVER_URL_KEY, serverUrl);
      Alert.alert("Success", "Server URL updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error saving server URL:", error);
      Alert.alert("Error", "Failed to save server URL");
    } finally {
      setLoading(false);
    }
  };

  const handleResetToDefault = async () => {
    Alert.alert("Reset to Default", `Reset server URL to ${DEFAULT_API_URL}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        onPress: async () => {
          setLoading(true);
          try {
            await SecureStore.setItemAsync(SERVER_URL_KEY, DEFAULT_API_URL);
            setServerUrl(DEFAULT_API_URL);
            Alert.alert("Success", "Server URL reset to default");
          } catch (error) {
            console.error("Error resetting server URL:", error);
            Alert.alert("Error", "Failed to reset server URL");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Server Settings</Text>
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
          <Text style={styles.description}>
            Configure the backend server URL for API requests
          </Text>

          <TextInput
            label="Server URL"
            value={serverUrl}
            onChangeText={setServerUrl}
            mode="outlined"
            style={styles.input}
            placeholder="http://192.168.1.41:8080"
            keyboardType="url"
            autoCapitalize="none"
            disabled={loading}
          />

          <Text style={styles.hint}>
            Example: http://192.168.1.41:8080 or https://api.example.com
          </Text>

          <Button
            mode="contained"
            onPress={handleSaveUrl}
            style={styles.saveButton}
            disabled={loading}
          >
            Save URL
          </Button>

          <Button
            mode="outlined"
            onPress={handleResetToDefault}
            disabled={loading}
            style={styles.resetButton}
          >
            Reset to Default
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    maxHeight: "80%",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
  content: {
    padding: 24,
    paddingTop: 8,
  },
  description: {
    color: "#4b5563",
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    marginBottom: 8,
    backgroundColor: "#f9fafb",
  },
  hint: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 16,
    fontStyle: "italic",
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 12,
  },
  resetButton: {
    marginBottom: 16,
  },
});
