import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        AI Quote Generator
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Create unique, inspirational quotes from influential figures
      </Text>
      <View style={styles.buttonContainer}>
        <Link href="/(auth)/login" asChild>
          <Button mode="contained" style={styles.button}>
            Login
          </Button>
        </Link>
        <Link href="/(auth)/signup" asChild>
          <Button mode="outlined" style={styles.button}>
            Sign Up
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginVertical: 8,
  },
}); 