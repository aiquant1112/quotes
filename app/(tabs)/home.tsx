import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { BackendHealthCheck } from '../../components/BackendHealthCheck';
import { useQuotes } from '../../hooks/useQuotes';
import { Quote } from '../../types';

export default function Home() {
  const { dailyQuote, featuredQuotes, loading, error } = useQuotes();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <BackendHealthCheck />
      
      <Card style={styles.dailyQuoteCard}>
        <Card.Content>
          <Text style={styles.dailyQuoteText}>{dailyQuote?.content}</Text>
          <Text style={styles.dailyQuoteAuthor}>- {dailyQuote?.author}</Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Featured Quotes</Text>
      {featuredQuotes.map((quote: Quote) => (
        <Card key={quote.id} style={styles.quoteCard}>
          <Card.Content>
            <Text style={styles.quoteText}>{quote.content}</Text>
            <Text style={styles.quoteAuthor}>- {quote.author}</Text>
            <Text style={styles.quoteCategory}>{quote.category}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  dailyQuoteCard: {
    margin: 16,
    elevation: 4,
  },
  dailyQuoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  dailyQuoteAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    marginTop: 8,
  },
  quoteCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  quoteCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
}); 