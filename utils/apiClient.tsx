import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';

const API_BASE_URL = __DEV__
  ? 'http://10.134.199.106:8080'
  : process.env.EXPO_PUBLIC_API_URL || 'https://your-api.com';

export const apiClient = {
  get: async (endpoint: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Request error');
    return response.json();
  },

  getImage: async (endpoint: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'string',
      },
    });
    if (!response.ok) throw new Error('Request error');
    return response;
  },

  getRaw: async (endpoint: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Request error');
    return response;
  },

  put: async (endpoint: string, data: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) throw new Error('Request error');
    return response.json();
  },

  putForm: async (endpoint: string, data: FormData) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        // Pas de Content-Type pour FormData, le navigateur le gère
      },
      body: data,
    });
    if (!response.ok) throw new Error('Request error');
    return response;
  },

  post: async (endpoint: string, data: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) throw new Error('Request error');
    return response.json();
  },

  delete: async (endpoint: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Delete request error');
    return response.status === 204 ? null : response;
  },

  patch: async (endpoint: string, data: string) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) throw new Error('Request error');
    return response.json();
  },

  // Helper pour sauvegarder le token
  setToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  // Helper pour supprimer le token (logout)
  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  // Helper pour vérifier si un token existe
  hasToken: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token !== null;
  },
};
