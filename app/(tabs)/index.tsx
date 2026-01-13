import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AREA</Text>

      {/* <Image */}
      {/*   source={require('@/assets/images/area-logo.png')} */}
      {/*   style={styles.logo} */}
      {/*   contentFit="contain" */}
      {/* /> */}

      <Button 
        mode="contained" 
        onPress={() => router.push('/login')}
        style={styles.loginButton}
        labelStyle={styles.loginButtonText}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    letterSpacing: 6,
  },
  logo: {
    width: 150,
    height: 150,
  },
  loginButton: {
    marginTop: 32,
    paddingHorizontal: 32,
  },
  loginButtonText: {
    fontSize: 16,
  },
});
