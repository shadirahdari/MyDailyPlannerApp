import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Calendar from '../components/Calendar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../components/theme';

export default function CalendarScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Header
        title="My Daily Planner"
        subtitle={new Date().toDateString()}
        onLeftPress={() => navigation.navigate('Settings')}
        rightIcon="settings"
        onRightPress={() => navigation.navigate('Settings')}
        logo={Platform.OS === 'web' ? require('../assets/logo.svg') : require('../assets/logoData').default}
      />

      <View style={styles.content}>
        <View style={styles.card}>
          <Calendar initialDate={new Date()} selectedDate={selected} onSelectDate={setSelected} />
        </View>
      </View>

      <View style={styles.selectionBar}>
        <Text style={styles.selectionText}>
          {selected ? `Selected: ${selected.toDateString()}` : 'No date selected'}
        </Text>
      </View>
      <Footer
        onHomePress={() => navigation.navigate('Calendar')}
        onAddPress={() => navigation.navigate('Add')}
        onSettingsPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundLight },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 12 },
  card: { width: '100%', maxWidth: 720 },
  selectionBar: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: theme.card },
  selectionText: { fontSize: 16, color: theme.darkText },
});
