import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../components/theme';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add Item</Text>
        <Text style={styles.sub}>This is a placeholder Add screen. Implement form here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundLight, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: theme.card, padding: 20, borderRadius: 12, width: '90%', maxWidth: 720 },
  title: { fontSize: 20, fontWeight: '700', color: theme.darkText },
  sub: { marginTop: 8, color: theme.lightText },
});
