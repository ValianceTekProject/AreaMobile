/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
'use client'

import axios from "axios";
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Card, TextInput, Text, Button } from 'react-native-paper';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from "react";

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

  const onOkButton = async () => {
    await axios.post(`${baseUrl}/todos/add`, {
      "Item": "Test",
      "Completed": false
    });
  };

  // const [checked, setChecked] = useState(false);

  const check = async (item, completed) => {
    await axios.patch(`${baseUrl}/todos/mod`, {
      "Item": item,
      "Completed": !completed
    });
    // setChecked(!checked);
  }

  const [text, setText] = useState("");

  useEffect(() => {
    loadItems();
  }, [items]);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          fddfddf
          <TextInput
            label="Title"
            value={text}
            onChangeText={text => setText(text)}
          />
        </Card.Content>
        <Card.Actions>
          <Button onPress={onOkButton}>Add Task</Button>
        </Card.Actions>
      </Card>
      {items.map((item) => (
        <Card>
          <Card.Content>
            <Text variant="titleLarge">{item.Item}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => check(item.Item, item.Completed)}>{item.Completed ? "Done" : "Not Done Yet"}</Button>
          </Card.Actions>
        </Card>
      ))};
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
