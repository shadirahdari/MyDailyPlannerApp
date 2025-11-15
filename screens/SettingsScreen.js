import React from 'react';
import { View, Text } from 'react-native';
import styles from './SettingsScreen.styles';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.sub}>Placeholder settings screen.</Text>
      </View>
    </View>
  );
}


