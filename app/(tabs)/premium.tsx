import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, List, Card } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { QUOTE_LIMITS } from '../../lib/constants';

const FEATURES = [
  {
    title: 'Unlimited Quotes',
    description: `Generate as many quotes as you want (Free tier limited to ${QUOTE_LIMITS.FREE} quotes)`,
    icon: 'infinity',
  },
  {
    title: 'Advanced Categories',
    description: 'Access to premium categories and tones',
    icon: 'star',
  },
  {
    title: 'Priority Support',
    description: 'Get help from our support team within 24 hours',
    icon: 'headset',
  },
  {
    title: 'Ad-Free Experience',
    description: 'Enjoy the app without any advertisements',
    icon: 'block-helper',
  },
];

export default function Premium() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    try {
      setLoading(true);

      // In a real app, you would integrate with Stripe here
      // For now, we'll just update the user's subscription tier
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_tier: 'premium' })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      router.back();
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Upgrade to Premium
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Unlock all features and generate unlimited quotes
        </Text>
      </View>

      <Card style={styles.priceCard}>
        <Card.Content>
          <Text variant="headlineLarge" style={styles.price}>
            $4.99
          </Text>
          <Text variant="bodyMedium" style={styles.pricePeriod}>
            per month
          </Text>
        </Card.Content>
      </Card>

      <List.Section>
        <List.Subheader>Premium Features</List.Subheader>
        {FEATURES.map((feature, index) => (
          <List.Item
            key={index}
            title={feature.title}
            description={feature.description}
            left={props => <List.Icon {...props} icon={feature.icon} />}
          />
        ))}
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubscribe}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Subscribe Now
        </Button>
        <Button
          mode="text"
          onPress={() => router.back()}
          style={styles.button}
        >
          Maybe Later
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  priceCard: {
    margin: 16,
    elevation: 4,
  },
  price: {
    textAlign: 'center',
    color: '#6200ee',
  },
  pricePeriod: {
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
}); 