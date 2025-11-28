import React, { useEffect, useState } from "react";
import { Card, TextInput, Text, Button, IconButton, MD3Colors } from 'react-native-paper';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
