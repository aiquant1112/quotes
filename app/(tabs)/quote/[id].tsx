import { View, StyleSheet, ScrollView, Share } from 'react-native';
import { Text, Button, IconButton, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { Quote } from '../../../types';
import { formatDate } from '../../../lib/utils';

export default function QuoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuote();
  }, [id]);

  async function fetchQuote() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setQuote(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      router.back();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete quote');
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    try {
      await Share.share({
        message: `"${quote?.content}" - ${quote?.author}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !quote) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error || 'Quote not found'}</Text>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.quote}>
            "{quote.content}"
          </Text>
          <Text variant="titleMedium" style={styles.author}>
            - {quote.author}
          </Text>
          <Text variant="bodyMedium" style={styles.meta}>
            {formatDate(quote.created_at)} • {quote.category}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <IconButton
          icon="share"
          size={24}
          onPress={handleShare}
          style={styles.actionButton}
        />
        <IconButton
          icon="delete"
          size={24}
          onPress={handleDelete}
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  quote: {
    marginBottom: 16,
    lineHeight: 32,
  },
  author: {
    marginBottom: 8,
    opacity: 0.7,
  },
  meta: {
    opacity: 0.5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  actionButton: {
    marginHorizontal: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
}); 