import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { testSupabaseConnection } from '../lib/supabase';
import { testOpenAIConnection } from '../lib/openai';

type ServiceStatus = {
  name: string;
  status: 'checking' | 'success' | 'error';
  error?: string;
};

export const BackendHealthCheck = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Supabase', status: 'checking' },
    { name: 'OpenAI', status: 'checking' },
  ]);

  useEffect(() => {
    const checkServices = async () => {
      // Check Supabase
      try {
        const supabaseStatus = await testSupabaseConnection();
        setServices(prev => prev.map(s => 
          s.name === 'Supabase' 
            ? { ...s, status: supabaseStatus ? 'success' : 'error' }
            : s
        ));
      } catch (error) {
        setServices(prev => prev.map(s => 
          s.name === 'Supabase' 
            ? { ...s, status: 'error', error: error.message }
            : s
        ));
      }

      // Check OpenAI
      try {
        const openAIStatus = await testOpenAIConnection();
        setServices(prev => prev.map(s => 
          s.name === 'OpenAI' 
            ? { ...s, status: openAIStatus ? 'success' : 'error' }
            : s
        ));
      } catch (error) {
        setServices(prev => prev.map(s => 
          s.name === 'OpenAI' 
            ? { ...s, status: 'error', error: error.message }
            : s
        ));
      }
    };

    checkServices();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backend Health Check</Text>
      {services.map(service => (
        <View key={service.name} style={styles.service}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={[
            styles.status,
            service.status === 'success' && styles.success,
            service.status === 'error' && styles.error
          ]}>
            {service.status.toUpperCase()}
          </Text>
          {service.error && (
            <Text style={styles.errorText}>{service.error}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  service: {
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
}); 