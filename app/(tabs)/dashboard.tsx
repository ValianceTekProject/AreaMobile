import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Text,
  Button,
  IconButton,
  Switch,
  FAB,
} from "react-native-paper";
import { apiClient } from "@/utils/apiClient";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

type Area = {
  id: number;
  name: string;
  isEnabled: boolean;
};

type User = {
  userId: number;
  mail: string;
  admin: boolean;
};

export default function DashboardPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [user, setUser] = useState<User>();
  const [admin, setAdmin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { signOut } = useAuth();

  const fetchAreas = async () => {
    try {
      const data = await apiClient.get("/areas");
      setAreas(data);
    } catch (e) {
      console.error("Failed to fetch areas", e);
    }
  };

  const handleToggleArea = async (id: number, isEnable: boolean) => {
    setAreas(
      areas.map((area) =>
        area.id === id ? { ...area, isEnabled: !isEnable } : area,
      ),
    );

    try {
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
    }
  };

  const deleteArea = async (id: number) => {
    try {
      await apiClient.delete(`/areas/${id}/delete`);
      fetchAreas();
    } catch (e) {
      console.log("Failed to delete Area", e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAreas();
    await getMyInformation();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAreas();
    getMyInformation();
  }, []);

  const handleDisconnect = async () => {
    try {
      setAreas([]);
      await signOut();
    } catch (e) {
      console.error("Failed to disconnect", e);
    }
  };

  useEffect(() => {
    if (user?.admin) setAdmin(true);
  }, [user]);

  const getMyInformation = async () => {
    try {
      const data = await apiClient.get("/me");
      setUser(data);
    } catch (error) {
      console.error("failed to get user information", error);
      return null;
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
        {admin && (
          <FAB
            icon="shield-crown"
            style={styles.fab}
            onPress={() => router.push("/admin")}
            label="Admin"
          />
        )}
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
  fab: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
  },
});
