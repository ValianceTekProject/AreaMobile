/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
'use client'

import LoginPage from "./src/features/authentication/LoginPage";
import axios from "axios";
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Card, TextInput, Text, Button, IconButton, MD3Colors } from 'react-native-paper';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}


const baseUrl = "http://10.0.2.2:8080";

function AppContent() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const res = axios.get(`${baseUrl}/todos`);
    setItems((await res).data);
  }

  const onOkButton = async (title) => {
    await axios.post(`${baseUrl}/todos/add`, {
      "Item": title,
      "Completed": false
    });
    loadItems();
  };

  const onDeleteButton = async (item) => {
    await axios.delete(`${baseUrl}/todos/del`, {
      data: { "Item": item }
    });
    loadItems();
  };

  const check = async (item, completed) => {
    await axios.patch(`${baseUrl}/todos/mod`, {
      "Item": item,
      "Completed": !completed
    });
    loadItems();
  };

  const [text, setText] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <LoginPage/>
      {/* <Card>
        <Card.Content>
          <TextInput
            label="Title"
            value={text}
            onChangeText={text => setText(text)}
          />
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => onOkButton(text)}>Add Task</Button>
        </Card.Actions>
      </Card>
      {items.map((item) => (
        <Card>
          <Card.Content>
            <Text variant="titleLarge">{item.Item}</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="camera"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => onDeleteButton(item.Item)}
            />
            <Button onPress={() => check(item.Item, item.Completed)}>{item.Completed ? "Done" : "Not Done Yet"}</Button>
          </Card.Actions>
        </Card>
      ))}; */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
