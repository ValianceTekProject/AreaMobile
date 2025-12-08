/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
'use client'

import LoginPage from "./src/features/authentication/LoginPage";
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Card, TextInput, Text, Button, IconButton, MD3Colors, Provider as PaperProvider, Appbar } from 'react-native-paper';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import DashboardPage from "./src/features/dashboard/DashboardPage";
import { lightTheme, darkTheme } from "./src/themes/theme.tsx";

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkMode);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={ isDarkTheme ? lightTheme : darkTheme }>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="AREA" />
        <Appbar.Action icon={ isDarkTheme ? "weather-sunny" : "weather-night"} onPress={() => setIsDarkTheme(!isDarkTheme)} />
      </Appbar.Header>
      <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}


const baseUrl = "http://10.0.2.2:8080";

function AppContent() {

  return (
    <View style={styles.container}>
      <DashboardPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
