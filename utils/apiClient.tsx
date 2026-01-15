import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "userToken";

const API_BASE_URL = "http://192.168.1.41:8080";

export const apiClient = {
  get: async (endpoint: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Request error");
    return response.json();
  },

  put: async (endpoint: string, data: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (!response.ok) throw new Error("Request error");
    return response.json();
  },

  post: async (endpoint: string, data: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) throw new Error("Request error");

    const text = await response.text();

    if (!text || text.trim() === "") {
      return { success: true };
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn("Response is not valid JSON:", text);
      return { success: true };
    }
  },

  delete: async (endpoint: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) throw new Error("Delete request error");
    return response.status === 204 ? null : response;
  },

  patch: async (endpoint: string, data: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (!response.ok) throw new Error("Request error");
    return response.json();
  },

  setToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  hasToken: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token !== null;
  },
};
