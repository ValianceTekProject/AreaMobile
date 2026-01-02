import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HeaderArgs = {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigationProp = NativeStackNavigationProp<{
  Settings: undefined;
}>;

export function Header({ isDarkTheme, setIsDarkTheme }: HeaderArgs) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Appbar.Header>
        <Appbar.Content title="AREA" />
        <Appbar.Action icon={ isDarkTheme ? "weather-sunny" : "weather-night"} onPress={() => setIsDarkTheme(!isDarkTheme)} />
        <Appbar.Action icon="cog" onPress={() => navigation.navigate("Settings")} />
      </Appbar.Header>
  );
}
