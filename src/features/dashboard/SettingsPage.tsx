import React, { use, useState } from "react";
import { Card, TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import axios from "axios";

const statusOK = 200;

export default function SettingsPage() {
  const baseUrl = "http://10.0.2.2:8080";

  const onGithubButton = async () => {
    Linking.openURL(`${baseUrl}/auth/github/login`);
  };

  const onGoogleButton = async () => {
    Linking.openURL(`${baseUrl}/auth/google/login`);
  };

  const onDiscordButton = async () => {
    Linking.openURL(`${baseUrl}/auth/discord/login`);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Actions>
        <Button mode="contained" onPress={onGithubButton}>Github</Button>
        <Button mode="contained" onPress={onGoogleButton}>Google</Button>
        <Button mode="contained" onPress={onDiscordButton}>Discord</Button>
        </Card.Actions>
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
