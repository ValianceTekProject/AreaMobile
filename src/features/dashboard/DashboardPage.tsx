import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, TextInput, Text, Button, IconButton, MD3Colors, Switch } from 'react-native-paper';
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
        id: string;
        name: string;
        is_enabled: boolean;
        };

    const [items, setItems] = useState<Todo[]>([]);

  const loadItems = async () => {
    const res = await axios.get(`${baseUrl}/areas`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    setItems((await res).data);
  };


  const onToggleSwitch = async (id: string, status: boolean) => {
    await axios.patch(`${baseUrl}/areas/${id}/status`, { "is_enabled": !status }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    loadItems();
  };

    useEffect(() => {
        loadItems();
    }, []);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Switch value={item.is_enabled} onValueChange={() => onToggleSwitch(item.id, item.is_enabled)} />
            <Text variant="titleLarge">AREA Name: {item.name}</Text>
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
