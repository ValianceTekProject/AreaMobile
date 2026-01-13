import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Modal } from 'react-native';
import { TextInput, Button, Divider, Text, IconButton } from 'react-native-paper';

type LoginModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

export default function LoginModal({ visible, onDismiss }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logique de connexion classique
    console.log('Login:', email, password);
    onDismiss();
  };

  const handleOAuthGoogle = () => {
    // Logique OAuth Google
    console.log('Login with Google');
    onDismiss();
  };

  const handleOAuthGithub = () => {
    // Logique OAuth GitHub
    console.log('Login with GitHub');
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={onDismiss}
              iconColor="#fff"
            />
          </View>

          <ScrollView 
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry
            />

            <Button 
              mode="contained" 
              onPress={handleLogin}
              style={styles.loginButton}
            >
              Sign In
            </Button>

            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <Divider style={styles.divider} />
            </View>

            <Button 
              mode="outlined" 
              onPress={handleOAuthGoogle}
              style={styles.oauthButton}
              icon="google"
            >
              Continue with Google
            </Button>

            <Button 
              mode="outlined" 
              onPress={handleOAuthGithub}
              style={styles.oauthButton}
              icon="github"
            >
              Continue with GitHub
            </Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 24,
    paddingTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  oauthButton: {
    marginBottom: 12,
  },
});
