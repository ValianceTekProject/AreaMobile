import React, { useState } from "react";
import { Card, TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "http://10.0.2.2:8080";

  const onGithubButton = async () => {
    Linking.openURL(`${baseUrl}/auth/github/login`);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            style={styles.inputs}
            theme={{
              colors: {
                primary: "#1B1D20",
                outline: "#1B1D20",
              }
            }}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
              label="Password"
              mode="outlined"
              value={password}
              style={styles.inputs}
              theme={{
              colors: {
                primary: "#1B1D20",
                outline: "#1B1D20",
              }
              }}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              onChangeText={text => setPassword(text)}
          />
        <Button mode="contained">Log In</Button>
        <Button mode="contained" onPress={onGithubButton}>Github</Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 400,
    height: 500
  },
  inputs: {
    margin: 10
  }
});
