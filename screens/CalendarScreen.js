import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonthData(year, month) {
  // month: 0-11
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();

  const cells = [];
  // leading blanks
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

export default function CalendarScreen() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(null);

  const cells = useMemo(() => getMonthData(viewDate.getFullYear(), viewDate.getMonth()), [viewDate]);

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function renderDay({ item }) {
    if (!item) {
      return <View style={styles.dayCell} />;
    }

    const isToday =
      item.getFullYear() === today.getFullYear() &&
      item.getMonth() === today.getMonth() &&
      item.getDate() === today.getDate();

    const isSelected =
      selected &&
      item.getFullYear() === selected.getFullYear() &&
      item.getMonth() === selected.getMonth() &&
      item.getDate() === selected.getDate();

    return (
      <TouchableOpacity style={[styles.dayCell, isSelected && styles.selectedDay]} onPress={() => setSelected(item)}>
        <Text style={[styles.dayText, isToday && styles.todayText]}>{item.getDate()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{viewDate.toLocaleString(undefined, { month: 'long' })} {viewDate.getFullYear()}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <Text key={d} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      <FlatList
        data={cells}
        keyExtractor={(item, idx) => (item ? item.toISOString() : `blank-${idx}`)}
        renderItem={renderDay}
        numColumns={7}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
      />

      <View style={styles.selectionBar}>
        <Text style={styles.selectionText}>
          {selected ? `Selected: ${selected.toDateString()}` : 'No date selected'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '600' },
  navButton: { padding: 8 },
  navText: { fontSize: 22 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 4 },
  weekDay: { width: `${100 / 7}%`, textAlign: 'center', fontWeight: '600', color: '#444' },
  grid: { paddingHorizontal: 4, paddingBottom: 12 },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', padding: 6 },
  dayText: { fontSize: 16, color: '#111' },
  todayText: { color: '#007AFF', fontWeight: '700' },
  selectedDay: { backgroundColor: '#007AFF20', borderRadius: 8 },
  selectionBar: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  selectionText: { fontSize: 16 },
});
