import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Button, IconButton, Switch } from "react-native-paper";
import { apiClient } from "@/utils/apiClient";

type Area = {
  id: number;
  name: string;
  isEnabled: boolean;
};

type DashboardArgs = {
  navigation: any;
  user: any | null;
  onLogin: (user: any | null) => void;
};

export default function DashboardPage({
  navigation,
  user,
  onLogin,
}: DashboardArgs) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAreas = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get("/areas");
      setAreas(data);
    } catch (e) {
      console.error("Failed to fetch areas", e);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAreas();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="plus"
            size={20}
            onPress={() => navigation.navigate("CreateArea")}
          />
        </View>

        <FlatList
          data={areas}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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

        <Card.Actions>
          <Card>
            <Button onPress={() => navigation.navigate("Settings")}>
              Settings
            </Button>
          </Card>
          <Button onPress={() => onLogin(null)}>Disconnect</Button>
        </Card.Actions>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card: { margin: 5 },
});
