import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function VerifyEmail() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Check Your Email
      </Text>
      
      <Text style={styles.message}>
        We've sent you a verification link. Please check your email and click the link to verify your account.
      </Text>

      <Button
        mode="contained"
        onPress={() => router.replace('/(auth)/login')}
        style={styles.button}
      >
        Return to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  message: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',
  },
}); 