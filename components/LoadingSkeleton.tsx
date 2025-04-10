import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type LoadingSkeletonProps = {
  type: 'quote' | 'list' | 'card';
};

export function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  if (type === 'quote') {
    return (
      <SkeletonPlaceholder>
        <View style={styles.quoteContainer}>
          <View style={styles.quoteText} />
          <View style={styles.quoteText} />
          <View style={styles.quoteText} />
          <View style={styles.authorText} />
        </View>
      </SkeletonPlaceholder>
    );
  }

  if (type === 'list') {
    return (
      <SkeletonPlaceholder>
        <View style={styles.listContainer}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.listText} />
              <View style={styles.listText} />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    );
  }

  if (type === 'card') {
    return (
      <SkeletonPlaceholder>
        <View style={styles.cardContainer}>
          <View style={styles.cardText} />
          <View style={styles.cardText} />
          <View style={styles.cardText} />
          <View style={styles.cardText} />
        </View>
      </SkeletonPlaceholder>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  quoteContainer: {
    padding: 16,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  quoteText: {
    height: 20,
    marginBottom: 8,
    borderRadius: 4,
  },
  authorText: {
    height: 20,
    width: '50%',
    borderRadius: 4,
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  listText: {
    height: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  cardContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  cardText: {
    height: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
}); 