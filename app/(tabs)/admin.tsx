import { apiClient } from "@/utils/apiClient";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  DataTable,
  Card,
  Text,
  IconButton,
  Chip,
  Searchbar,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
  id: number;
  email: string;
  admin: boolean;
  role: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const data = await apiClient.get("/users");
      console.log("data = ", data);
      setUsers(data);
    } catch (error) {
      console.log("failed to get users", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="titleLarge">Dashboard Overview</Text>
              <Text variant="bodyMedium">Total Users: {users.length}</Text>
            </Card.Content>
          </Card>

          <Searchbar
            placeholder="Search users"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>Role</DataTable.Title>
            </DataTable.Header>

            {users.map((user) => (
              <DataTable.Row key={user.id}>
                <DataTable.Cell>{user.email}</DataTable.Cell>
                <DataTable.Cell>
                  {user.admin ? (
                    <Chip
                      mode="flat"
                      icon="check"
                      textStyle={{ color: "green" }}
                    >
                      Admin
                    </Chip>
                  ) : (
                    <Chip
                      mode="outlined"
                      icon="close"
                      textStyle={{ color: "gray" }}
                    >
                      User
                    </Chip>
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statsCard: {
    marginBottom: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
