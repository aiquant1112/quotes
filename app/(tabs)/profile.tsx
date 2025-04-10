import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, List, Switch, Divider } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

type UserProfile = {
  email: string;
  full_name: string;
  subscription_tier: 'free' | 'premium';
  notification_preferences: {
    daily_quote: boolean;
    weekly_digest: boolean;
  };
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.replace('/(auth)/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  async function toggleNotification(type: 'daily_quote' | 'weekly_digest') {
    if (!profile) return;

    try {
      const newPreferences = {
        ...profile.notification_preferences,
        [type]: !profile.notification_preferences[type],
      };

      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: newPreferences })
        .eq('id', profile.id);

      if (error) throw error;

      setProfile({
        ...profile,
        notification_preferences: newPreferences,
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Error loading profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="headlineMedium" style={styles.title}>
          Profile
        </Text>
        <Text variant="bodyLarge" style={styles.email}>
          {profile.email}
        </Text>
        <Text variant="bodyMedium" style={styles.subscription}>
          {profile.subscription_tier === 'premium' ? 'Premium Member' : 'Free Member'}
        </Text>
      </View>

      <Divider />

      <List.Section>
        <List.Subheader>Notification Settings</List.Subheader>
        <List.Item
          title="Daily Quote"
          description="Receive a new quote every day"
          right={() => (
            <Switch
              value={profile.notification_preferences.daily_quote}
              onValueChange={() => toggleNotification('daily_quote')}
            />
          )}
        />
        <List.Item
          title="Weekly Digest"
          description="Get a weekly summary of your favorite quotes"
          right={() => (
            <Switch
              value={profile.notification_preferences.weekly_digest}
              onValueChange={() => toggleNotification('weekly_digest')}
            />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Upgrade to Premium"
          description="Get unlimited access to all features"
          left={props => <List.Icon {...props} icon="star" />}
          onPress={() => {
            // Navigate to premium upgrade screen
          }}
        />
        <List.Item
          title="Privacy Policy"
          left={props => <List.Icon {...props} icon="shield-check" />}
          onPress={() => {
            // Navigate to privacy policy
          }}
        />
        <List.Item
          title="Terms of Service"
          left={props => <List.Icon {...props} icon="file-document" />}
          onPress={() => {
            // Navigate to terms of service
          }}
        />
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          Sign Out
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
  section: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  email: {
    marginBottom: 4,
  },
  subscription: {
    color: '#666',
  },
  buttonContainer: {
    padding: 16,
  },
  signOutButton: {
    marginTop: 16,
  },
}); 