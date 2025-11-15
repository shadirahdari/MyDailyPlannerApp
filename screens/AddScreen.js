import React from 'react';
import { View, Text } from 'react-native';
import styles from './AddScreen.styles';

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

