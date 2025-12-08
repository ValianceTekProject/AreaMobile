import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, TextInput, Text, Button, IconButton, MD3Colors } from 'react-native-paper';
import { StyleSheet, View, useColorScheme } from 'react-native';
import axios from "axios";

type DashboardArgs = {
  navigation: NativeStackNavigationProp<any>;
  user: any | null;
  onLogin: (user: any) => void;
};

export default function DashboardPage({ navigation, user, onLogin } : DashboardArgs) {
  const baseUrl = "http://10.0.2.2:8080";
  const theme = useColorScheme();

    type Todo = {
        action: string;
        reaction: string;
        };

    const [items, setItems] = useState<Todo[]>([]);

  useEffect(() => {
    setItems([{ "action": "blablabla",
                    "reaction": "test"
                },
                { "action": "blablabla",
                    "reaction": "test"
                }]);
    }, []);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Action: {item.action}</Text>
            <Text variant="titleLarge">Reaction: {item.reaction}</Text>
          </Card.Content>
          <Card.Actions>
            <Button>Apply</Button>
          </Card.Actions>
        </Card>
      ))}
        <Button onPress={() => navigation.navigate("Settings")}>Settings</Button>
        <Button onPress={() => onLogin(null)}>Disconnect</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: "90%",
    height: "20%",
    margin: 10
  },
  inputs: {
    margin: 10
  }
});
