import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Alert, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  IconButton,
  ActivityIndicator,
  List,
} from "react-native-paper";
import { router } from "expo-router";
import { apiClient } from "@/utils/apiClient";

type action = {
  name: string;
  description: string;
};

type reaction = {
  name: string;
  description: string;
};

type service = {
  name: string;
  actions: action[];
  reactions: reaction[];
};

type About = {
  services: service[];
};

type Area = {
  id: string;
  name: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export default function CreateAreaModal() {
  const [about, setAbout] = useState<About>();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState<Area>();

  const [selectedActionService, setSelectedActionService] =
    useState<service | null>(null);
  const [selectedAction, setSelectedAction] = useState<action | null>(null);

  const [selectedReactionService, setSelectedReactionService] =
    useState<service | null>(null);
  const [selectedReaction, setSelectedReaction] = useState<reaction | null>(
    null,
  );

  const [actionServiceExpanded, setActionServiceExpanded] = useState(false);
  const [actionExpanded, setActionExpanded] = useState(false);
  const [reactionServiceExpanded, setReactionServiceExpanded] = useState(false);
  const [reactionExpanded, setReactionExpanded] = useState(false);

  useEffect(() => {
    const getAbout = async () => {
      try {
        setLoading(true);
        const raw = await apiClient.get("/about.json");
        const data: About = { services: raw.server.services };
        setAbout(data);
      } catch (error) {
        console.error("get about.json", error);
      } finally {
        setLoading(false);
      }
    };

    getAbout();
  }, []);

  useEffect(() => {
    console.log("area = ", area?.id);
  }, [area]);

  const handleCreateArea = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter an area name");
      return;
    }

    if (
      !selectedAction ||
      !selectedReaction ||
      !selectedActionService ||
      !selectedReactionService
    ) {
      Alert.alert("Error", "Please select an action and a reaction");
      return;
    }

    setLoading(true);

    try {
      const data = await apiClient.post(
        "/areas/create",
        JSON.stringify({
          name: name.trim(),
        }),
      );
      const createdArea = data.area;
      setArea(data.area);
      await apiClient.post(
        `/areas/${createdArea.id}/action/add`,
        JSON.stringify({
          name: selectedAction.name,
          service_name: selectedActionService.name,
        }),
      );

      await apiClient.post(
        `/areas/${createdArea.id}/reaction/add`,
        JSON.stringify({
          name: selectedReaction.name,
          service_name: selectedReactionService.name,
        }),
      );

      Alert.alert("Success", "Area created successfully!");
      router.back();
    } catch (error) {
      console.error("Create area error:", error);
      Alert.alert("Error", "Failed to create area. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New Area</Text>
          <IconButton
            icon="close"
            size={24}
            onPress={() => router.back()}
            iconColor="#fff"
          />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            label="Area Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
            disabled={loading}
            placeholder="Area Test"
          />

          <List.Section>
            <List.Accordion
              title={
                selectedActionService
                  ? `Service Action: ${selectedActionService.name}`
                  : "Select the action Service"
              }
              left={(props) => <List.Icon {...props} icon="folder" />}
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              expanded={actionServiceExpanded}
              onPress={() => setActionServiceExpanded(!actionServiceExpanded)}
            >
              {about?.services.map((srv) => (
                <List.Item
                  key={srv.name}
                  title={srv.name}
                  onPress={() => {
                    setSelectedActionService(srv);
                    setSelectedAction(null);
                    setActionServiceExpanded(false);
                    setActionExpanded(true);
                  }}
                  style={styles.item}
                />
              ))}
            </List.Accordion>

            {selectedActionService && (
              <List.Accordion
                title={
                  selectedAction
                    ? `Action: ${selectedAction.name}`
                    : "Select an Action"
                }
                left={(props) => (
                  <List.Icon {...props} icon="play-circle-outline" />
                )}
                style={styles.accordion}
                titleStyle={styles.accordionTitle}
                expanded={actionExpanded}
                onPress={() => setActionExpanded(!actionExpanded)}
              >
                {selectedActionService.actions.map((act) => (
                  <List.Item
                    key={act.name}
                    title={act.name}
                    description={act.description}
                    onPress={() => {
                      setSelectedAction(act);
                      setActionExpanded(false);
                    }}
                    style={styles.item}
                  />
                ))}
              </List.Accordion>
            )}
          </List.Section>

          <List.Section>
            <List.Accordion
              title={
                selectedReactionService
                  ? `Service Reaction: ${selectedReactionService.name}`
                  : "Select the reaction service"
              }
              left={(props) => <List.Icon {...props} icon="folder" />}
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              expanded={reactionServiceExpanded}
              onPress={() =>
                setReactionServiceExpanded(!reactionServiceExpanded)
              }
            >
              {about?.services
                .filter((srv) => srv.reactions && srv.reactions.length)
                .map((srv) => (
                  <List.Item
                    key={srv.name}
                    title={srv.name}
                    onPress={() => {
                      setSelectedReactionService(srv);
                      setSelectedReaction(null);
                      setReactionServiceExpanded(false);
                      setReactionExpanded(true);
                    }}
                    style={styles.item}
                  />
                ))}
            </List.Accordion>

            {selectedReactionService && selectedReactionService.reactions && (
              <List.Accordion
                title={
                  selectedReaction
                    ? `Reaction: ${selectedReaction.name}`
                    : "Select the reaction"
                }
                left={(props) => <List.Icon {...props} icon="flash" />}
                style={styles.accordion}
                titleStyle={styles.accordionTitle}
                expanded={reactionExpanded}
                onPress={() => setReactionExpanded(!reactionExpanded)}
              >
                {selectedReactionService.reactions.map((rea) => (
                  <List.Item
                    key={rea.name}
                    title={rea.name}
                    description={rea.description}
                    onPress={() => {
                      setSelectedReaction(rea);
                      setReactionExpanded(false);
                    }}
                    style={styles.item}
                  />
                ))}
              </List.Accordion>
            )}
          </List.Section>

          <Button
            mode="contained"
            onPress={handleCreateArea}
            style={styles.createButton}
            disabled={loading || !name.trim()}
          >
            {loading ? <ActivityIndicator color="#fff" /> : "Create Area"}
          </Button>

          <Button
            mode="text"
            onPress={() => router.back()}
            disabled={loading}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  modalContainer: {
    width: "92%",
    maxWidth: 420,
    maxHeight: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111",
  },

  scrollContainer: {
    flexGrow: 0,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
  },

  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  accordion: {
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
    borderRadius: 12,
  },

  accordionTitle: {
    color: "#111",
    fontWeight: "500",
  },

  item: {
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e6e6e6",
  },

  createButton: {
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 10,
  },

  cancelButton: {
    marginBottom: 4,
  },
});
