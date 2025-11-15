import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function Header({ title = 'My Daily Planner', subtitle }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  container: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', color: '#111' },
  subtitle: { marginTop: 2, fontSize: 13, color: '#666' },
});
