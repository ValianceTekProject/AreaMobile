import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, TextInput, Text, Button, IconButton, MD3Colors, Switch } from 'react-native-paper';
import { StyleSheet, View, useColorScheme, FlatList } from 'react-native';
import { getToken } from "../storage/Token.tsx";
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
        isEnabled: boolean;
        };

    const [items, setItems] = useState<Todo[]>([]);

  const loadItems = async () => {
    const token = await getToken();

    const res = await axios.get(`${baseUrl}/areas`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
    });
    setItems((await res).data);
  };


  const onToggleSwitch = async (id: string, status: boolean) => {
    const token = await getToken();

    await axios.patch(`${baseUrl}/areas/${id}/status`, { "is_enabled": !status }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
    });
    loadItems();
  };

    useEffect(() => {
        loadItems();
    }, []);

  return (
    <View style={styles.container}>
      <IconButton
            icon="plus"
            size={20}
            onPress={() => navigation.navigate("CreateArea")}
        />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Switch
                value={item.isEnabled}
                onValueChange={() => onToggleSwitch(item.id, item.isEnabled)}
              />
              <Text variant="titleLarge">AREA Name: {item.name}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Apply</Button>
            </Card.Actions>
          </Card>
        )}
      />
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
    margin: 5
  },
  inputs: {
    margin: 10
  }
});
