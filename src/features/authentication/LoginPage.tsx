import React, { use, useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import { setToken } from "../storage/Token.tsx";
import axios from "axios";

type LoginArgs = {
    navigation: NativeStackNavigationProp<any>;
  user: any | null;
  onLogin: (user: any) => void;
};

const statusOK = 200;

export default function LoginPage({ navigation, user, onLogin } : LoginArgs) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "http://10.0.2.2:8080";

  const onLoginButton = async () => {
    const response = await axios.post(`${baseUrl}/auth/login`, {
        "email": email,
        "password": password
    });
    if (response.status == statusOK) {
      onLogin("connected");
      setToken(response.data.token);
    }
  };

  const onCreateButton = async () => {
    navigation.navigate("Register");
  };

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
        <Button mode="contained" onPress={onLoginButton}>Log In</Button>
        <Button mode="contained" onPress={onCreateButton}>Create an account</Button>
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
