import React, { use, useState, useEffect, act } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, TextInput, Button, IconButton, List, Text, RadioButton } from 'react-native-paper';
import { StyleSheet, View, Linking, SectionList } from 'react-native';
import { getToken } from "../storage/Token.tsx";
import axios from "axios";

type AddAreaArgs = {
    navigation: NativeStackNavigationProp<any>;
    route: {
      params?: {
        id?: string;
      };
    };
  };

const statusOK = 200;

export default function AddAREAPage({ navigation, route } : AddAreaArgs) {
  const baseUrl = "http://10.0.2.2:8080";
  const id = route.params?.id;

  type Service  = {
        name: string,
        actions: {
            name: string,
            description: string
        }[],
        reactions: {
            name: string,
            description: string
        }[]
  };

  type About = {
        server: {
            services: [
                Service
            ]
        }
    };

  const [items, setItems] = useState<About>();

  type dataStruct = {
    name: string,
    service: string
  };

  const [action, setAction] = useState<dataStruct>({
    name: "",
    service: "",
  });

  const [reaction, setReaction] = useState<dataStruct>({
    name: "",
    service: "",
  });

  const onClickButton = async (type: string, name: string, service: string) => {
    if (type == 'actions') {
      setAction({ name, service });
    } else {
      setReaction({ name, service });
    }
  };

  const onAddButton = async () => {
    const token = await getToken();

    const response = await axios.post(`${baseUrl}/areas/${id}/action/add`, 
        {
            "name": action.name,
            "service_name": action.service
        },
        {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
    });
    if (response.status == statusOK)
      navigation.replace("Dashboard");
  };

  const loadAreas = async () => {
    const res = await axios.get(`${baseUrl}/about.json`, {
        headers: {
          "Content-Type": "application/json"
        }
    });
    setItems((await res).data);
  };

    useEffect(() => {
        loadAreas();
    }, []);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <SectionList
            sections={[
              { title: 'Actions', data: items?.server.services || [], type: 'actions' },
              { title: 'Reactions', data: items?.server.services || [], type: 'reactions' },
            ]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, section }) => (
              <Card>
                <Card.Title title={item.name} />
                <Card.Content>
                  {(section.type === 'actions' ? item.actions : item.reactions)?.map((area, i) => (
                    <Card key={i}>
                      <Card.Content>
                        <Text>{area.name}</Text>
                        <Text>{area.description}</Text>
                      </Card.Content>
                      <Card.Actions>
                        <RadioButton
                          value={area.name}
                          status={ area.name === (section.type === 'actions' ? action.name : reaction.name) ? 'checked' : 'unchecked' }
                          onPress={() => onClickButton(section.type, area.name, item.name)}
                        />
                      </Card.Actions>
                    </Card>
                  ))}
                </Card.Content>
              </Card>
            )}
            renderSectionHeader={({ section }) => (
              <Text variant="titleLarge">{section.title}</Text>
            )}
          />
          <Card.Actions>
            <IconButton
                icon="close"
                size={20}
                onPress={() => navigation.goBack()}
            />
            <IconButton
                icon="check"
                size={20}
                onPress={() => onAddButton()}
            />
          </Card.Actions>
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
    width: "85%",
    height: 500
  },
  inputs: {
    margin: 10
  }
});
