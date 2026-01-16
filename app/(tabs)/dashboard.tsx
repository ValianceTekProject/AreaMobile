import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Button, IconButton, Switch } from "react-native-paper";
import { apiClient } from "@/utils/apiClient";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

type Area = {
  id: number;
  name: string;
  isEnabled: boolean;
};

export default function DashboardPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { signOut } = useAuth();

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

  const handleToggleArea = async (id: number, isEnable: boolean) => {
    setAreas(
      areas.map((area) =>
        area.id === id ? { ...area, isEnabled: !isEnable } : area,
      ),
    );

    try {
      setLoading(true);
      await apiClient.patch(
        `/areas/${id}/status`,
        JSON.stringify({
          is_enabled: !isEnable,
        }),
      );
    } catch (e) {
      console.log("Failed to update status", e);
      setAreas(
        areas.map((area) =>
          area.id === id ? { ...area, isEnabled: !isEnable } : area,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteArea = async (id: number) => {
    try {
      setLoading(true);
      await apiClient.delete(`/areas/${id}/delete`);
      fetchAreas();
    } catch (e) {
      console.log("Failed to delete Area", e);
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

  const handleDisconnect = async () => {
    try {
      setAreas([]);
      await signOut();
    } catch (e) {
      console.error("Failed to disconnect", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="plus"
            size={20}
            onPress={() => router.push("/createArea")}
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
                <Switch
                  value={item.isEnabled}
                  onValueChange={(value) =>
                    handleToggleArea(item.id, item.isEnabled)
                  }
                />
                <Text variant="titleLarge">AREA Name: {item.name}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => deleteArea(item.id)}>Delete</Button>
              </Card.Actions>
            </Card>
          )}
        />

        <Card.Actions>
          <Button onPress={() => handleDisconnect()}>Disconnect</Button>
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
