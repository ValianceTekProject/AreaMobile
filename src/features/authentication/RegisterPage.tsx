import React, { useEffect, useState } from "react";
import { Card, TextInput, Text, Button, IconButton, MD3Colors } from 'react-native-paper';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import axios from "axios";
// import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";


export default function RegisterPage(args: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "http://10.0.2.2:8080";

  const onRegisterButton = async () => {
    const response = await axios.post(`${baseUrl}/auth/register`, {
        "email": email,
        "password": password
    });
    if (response.status == 200) 
      args.navigation.replace("Login");
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
        <Button mode="contained" onPress={onRegisterButton}>Register</Button>
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
