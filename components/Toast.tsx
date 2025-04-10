import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect, useRef } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  onHide: () => void;
};

export function Toast({ message, type, onHide }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  const backgroundColor = {
    success: '#4CAF50',
    error: '#F44336',
    info: '#2196F3',
  }[type];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          backgroundColor,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  message: {
    color: 'white',
    textAlign: 'center',
  },
}); 