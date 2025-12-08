import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#576CA8',
    background: '#FFFAFA',
    surface: '#ffffff',
    text: '#576CA8',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ffffff',
    background: '#1B264F',
    surface: '#a30404',
    text: '#ffffff',
  },
};
