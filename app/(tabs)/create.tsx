import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons, Card } from 'react-native-paper';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

type Category = 'motivation' | 'success' | 'life-lessons' | 'leadership' | 'personal-growth';
type Tone = 'serious' | 'humorous' | 'poetic' | 'philosophical';

export default function Create() {
  const [category, setCategory] = useState<Category>('motivation');
  const [tone, setTone] = useState<Tone>('serious');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerateQuote() {
    try {
      setLoading(true);
      setError(null);

      // Here you would integrate with your AI service to generate the quote
      // For now, we'll just create a placeholder
      const prompt = `Generate a ${tone} quote about ${category} in the style of ${author}`;
      
      // TODO: Replace with actual AI integration
      const response = await fetch('YOUR_AI_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Failed to generate quote');

      const data = await response.json();
      setGeneratedQuote(data.quote);

      // Save to database
      const { error: dbError } = await supabase
        .from('quotes')
        .insert({
          content: data.quote,
          author: author,
          category: category,
          tone: tone,
        });

      if (dbError) throw dbError;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="headlineMedium" style={styles.title}>
          Generate a Quote
        </Text>

        <TextInput
          label="Author Style"
          value={author}
          onChangeText={setAuthor}
          placeholder="e.g., Steve Jobs, Maya Angelou"
          style={styles.input}
        />

        <Text variant="bodyLarge" style={styles.label}>Category</Text>
        <SegmentedButtons
          value={category}
          onValueChange={value => setCategory(value as Category)}
          buttons={[
            { value: 'motivation', label: 'Motivation' },
            { value: 'success', label: 'Success' },
            { value: 'life-lessons', label: 'Life Lessons' },
            { value: 'leadership', label: 'Leadership' },
            { value: 'personal-growth', label: 'Growth' },
          ]}
          style={styles.segmentedButtons}
        />

        <Text variant="bodyLarge" style={styles.label}>Tone</Text>
        <SegmentedButtons
          value={tone}
          onValueChange={value => setTone(value as Tone)}
          buttons={[
            { value: 'serious', label: 'Serious' },
            { value: 'humorous', label: 'Humorous' },
            { value: 'poetic', label: 'Poetic' },
            { value: 'philosophical', label: 'Philosophical' },
          ]}
          style={styles.segmentedButtons}
        />

        <Button
          mode="contained"
          onPress={handleGenerateQuote}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Generate Quote
        </Button>

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        {generatedQuote && (
          <Card style={styles.quoteCard}>
            <Card.Content>
              <Text variant="bodyLarge" style={styles.quoteText}>
                "{generatedQuote}"
              </Text>
              <Text variant="bodyMedium" style={styles.authorText}>
                - {author}
              </Text>
            </Card.Content>
          </Card>
        )}
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
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  quoteCard: {
    marginTop: 16,
  },
  quoteText: {
    marginBottom: 8,
    fontStyle: 'italic',
  },
  authorText: {
    fontWeight: 'bold',
  },
}); 