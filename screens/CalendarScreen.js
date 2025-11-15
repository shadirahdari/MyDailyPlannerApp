import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calendar from '../components/Calendar';

export default function CalendarScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Calendar initialDate={new Date()} selectedDate={selected} onSelectDate={setSelected} />

      <View style={styles.selectionBar}>
        <Text style={styles.selectionText}>
          {selected ? `Selected: ${selected.toDateString()}` : 'No date selected'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  selectionBar: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  selectionText: { fontSize: 16 },
});
