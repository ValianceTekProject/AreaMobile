import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from '../features/authentication/RegisterPage';
import LoginPage from '../features/authentication/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import SettingsPage from '../features/dashboard/SettingsPage';
import CreateAREAPage from '../features/dashboard/CreateAREAPage';
import AddAREAPage from '../features/dashboard/AddAREAPage';

const Stack = createNativeStackNavigator();

type AppNavigatorArgs = {
  user: any | null;
  onLogin: (user: any) => void;
};

export default function AppNavigator({ user, onLogin }: AppNavigatorArgs) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard">
            {args => <DashboardPage {...args} user={user} onLogin={onLogin} />}
          </Stack.Screen>
          <Stack.Screen
            name="CreateArea"
            options={{
              presentation: 'transparentModal',
              headerShown: false,
              animation: 'fade',
            }}>
            {args => <CreateAREAPage {...args} user={user} onLogin={onLogin} />}
          </Stack.Screen>
          <Stack.Screen
          name="AddArea"
          component={AddAREAPage}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            animation: 'fade',
          }}>
          </Stack.Screen>
          <Stack.Screen name="Settings" component={SettingsPage} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {args => <LoginPage {...args} user={user} onLogin={onLogin} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterPage} />
        </>
      )}
    </Stack.Navigator>
  );
}
