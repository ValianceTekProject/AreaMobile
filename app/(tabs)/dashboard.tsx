import React from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Text, Button, IconButton, Switch } from 'react-native-paper';
import { StyleSheet, View, FlatList } from 'react-native';

type DashboardArgs = {
  navigation: NativeStackNavigationProp<any>;
  user: any | null;
  onLogin: (user: any) => void;
};

export default function DashboardPage({ navigation, user, onLogin } : DashboardArgs) {
  const items = [
    { id: '1', name: 'Area 1', isEnabled: true },
    { id: '2', name: 'Area 2', isEnabled: false },
    { id: '3', name: 'Area 3', isEnabled: true },
  ];

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
              <Switch value={item.isEnabled} />
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
