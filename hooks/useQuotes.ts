import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Quote, Category } from '../types';
import { QUOTE_LIMITS } from '../lib/constants';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [featuredQuotes, setFeaturedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
    fetchDailyQuote();
    fetchFeaturedQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quotes');
    }
  };

  const fetchDailyQuote = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('is_daily', true)
        .single();

      if (error) throw error;
      setDailyQuote(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch daily quote');
    }
  };

  const fetchFeaturedQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('is_featured', true)
        .limit(5);

      if (error) throw error;
      setFeaturedQuotes(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured quotes');
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async (content: string, author: string, category: Category) => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([{ content, author, category }])
        .select()
        .single();

      if (error) throw error;
      setQuotes(prev => [data, ...prev]);
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create quote';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteQuote = async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quoteId);

      if (error) throw error;
      setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete quote';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshQuotes = async () => {
    setLoading(true);
    await Promise.all([fetchQuotes(), fetchDailyQuote(), fetchFeaturedQuotes()]);
    setLoading(false);
  };

  return {
    quotes,
    dailyQuote,
    featuredQuotes,
    loading,
    error,
    createQuote,
    deleteQuote,
    refreshQuotes,
  };
}; 