import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AREA</Text>

      <Button
        mode="contained"
        onPress={() => router.push("/login")}
        style={styles.loginButton}
        labelStyle={styles.loginButtonText}
        buttonColor="#ffffff"
        textColor="#111111"
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push("/backAddress")}
        style={styles.loginButton}
        labelStyle={styles.loginButtonText}
        buttonColor="#ffffff"
        textColor="#111111"
      >
        Back Address
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },

  title: {
    fontSize: 52,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 48,
    letterSpacing: -1,
  },

  loginButton: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
  },

  loginButtonText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.8,
    paddingVertical: 6,
  },
});
