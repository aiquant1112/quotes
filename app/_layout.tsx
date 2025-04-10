import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../styles/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Quote Generator',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </PaperProvider>
  );
} 