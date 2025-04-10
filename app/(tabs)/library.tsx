import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Searchbar, Chip, FAB } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

type Quote = {
  id: string;
  content: string;
  author: string;
  category: string;
  created_at: string;
};

type Category = 'all' | 'motivation' | 'success' | 'life-lessons' | 'leadership' | 'personal-growth';

export default function Library() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, [selectedCategory]);

  async function fetchQuotes() {
    try {
      setLoading(true);
      let query = supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredQuotes = quotes.filter(quote =>
    quote.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search quotes"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView horizontal style={styles.categoriesContainer}>
        <Chip
          selected={selectedCategory === 'all'}
          onPress={() => setSelectedCategory('all')}
          style={styles.chip}
        >
          All
        </Chip>
        <Chip
          selected={selectedCategory === 'motivation'}
          onPress={() => setSelectedCategory('motivation')}
          style={styles.chip}
        >
          Motivation
        </Chip>
        <Chip
          selected={selectedCategory === 'success'}
          onPress={() => setSelectedCategory('success')}
          style={styles.chip}
        >
          Success
        </Chip>
        <Chip
          selected={selectedCategory === 'life-lessons'}
          onPress={() => setSelectedCategory('life-lessons')}
          style={styles.chip}
        >
          Life Lessons
        </Chip>
        <Chip
          selected={selectedCategory === 'leadership'}
          onPress={() => setSelectedCategory('leadership')}
          style={styles.chip}
        >
          Leadership
        </Chip>
        <Chip
          selected={selectedCategory === 'personal-growth'}
          onPress={() => setSelectedCategory('personal-growth')}
          style={styles.chip}
        >
          Growth
        </Chip>
      </ScrollView>

      <ScrollView style={styles.quotesContainer}>
        {filteredQuotes.map((quote) => (
          <Card key={quote.id} style={styles.card}>
            <Card.Content>
              <Text variant="bodyLarge" style={styles.quoteText}>
                "{quote.content}"
              </Text>
              <Text variant="bodyMedium" style={styles.authorText}>
                - {quote.author}
              </Text>
              <Text variant="bodySmall" style={styles.categoryText}>
                {quote.category}
              </Text>
              <Text variant="bodySmall" style={styles.dateText}>
                {new Date(quote.created_at).toLocaleDateString()}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Navigate to create screen
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
  quotesContainer: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  quoteText: {
    marginBottom: 8,
    fontStyle: 'italic',
  },
  authorText: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  categoryText: {
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    color: '#999',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 