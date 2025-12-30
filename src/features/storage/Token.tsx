import EncryptedStorage from 'react-native-encrypted-storage';

export async function setToken(token: string) {
  await EncryptedStorage.setItem('token', token);
};

export async function getToken() {
  return await EncryptedStorage.getItem('token');
};