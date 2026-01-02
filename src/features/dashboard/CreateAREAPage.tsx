import React, { use, useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, TextInput, Button, IconButton } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import { getToken } from "../storage/Token.tsx";
import axios from "axios";

type LoginArgs = {
    navigation: NativeStackNavigationProp<any>;
  user: any | null;
  onLogin: (user: any) => void;
};

const statusOK = 201;

export default function CreateAREAPage({ navigation, user, onLogin } : LoginArgs) {
  const [nameArea, setName] = useState("");

  const baseUrl = "http://10.0.2.2:8080";

  const onCreateButton = async () => {
    const token = await getToken();

    const response = await axios.post(`${baseUrl}/areas/create`, 
        {
            "name": nameArea
        },
        {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
    });
    if (response.status == statusOK)
      navigation.replace("AddArea", { id: (await response).data.area.id });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Area"
            mode="outlined"
            value={nameArea}
            style={styles.inputs}
            theme={{
              colors: {
                primary: "#1B1D20",
                outline: "#1B1D20",
              }
            }}
            onChangeText={text => setName(text)}
          />
        <IconButton
            icon="close"
            size={20}
            onPress={() => navigation.goBack()}
        />
        <IconButton
            icon="check"
            size={20}
            onPress={() => onCreateButton()}
        />
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
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  card: {
    width: "95%"
    // height: 500
  },
  inputs: {
    margin: 10
  }
});
