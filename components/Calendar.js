import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import theme from './theme';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

export default function Calendar({ initialDate, selectedDate: selectedProp, onSelectDate }) {
  const today = new Date();
  const initial = initialDate ? new Date(initialDate.getFullYear(), initialDate.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1);
  const [viewDate, setViewDate] = useState(initial);
  const [selected, setSelected] = useState(selectedProp || null);

  useEffect(() => {
    if (selectedProp) setSelected(selectedProp);
  }, [selectedProp]);

  const cells = useMemo(() => getMonthData(viewDate.getFullYear(), viewDate.getMonth()), [viewDate]);

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function handlePress(date) {
    setSelected(date);
    onSelectDate && onSelectDate(date);
  }

  function renderDay({ item, index }) {
    if (!item) return <View style={styles.dayCell} key={`blank-${index}`} />;

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
      <TouchableOpacity key={item.toISOString()} style={[styles.dayCell, isSelected && styles.selectedDay]} onPress={() => handlePress(item)}>
        <Text style={[styles.dayText, isToday && styles.todayText]}>{item.getDate()}</Text>
        {isSelected ? <View style={styles.selectedDot} /> : null}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container} {...(Platform.OS === 'web' ? { className: 'calendar-card' } : {})}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
          <Text style={[styles.navText, { color: theme.card }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>{viewDate.toLocaleString(undefined, { month: 'long' })} {viewDate.getFullYear()}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Text style={[styles.navText, { color: theme.card }]}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <Text key={d} style={[styles.weekDay, { color: theme.lightText }]}>{d}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: theme.card, borderRadius: 12, marginHorizontal: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700' },
  navButton: { padding: 8 },
  navText: { fontSize: 22 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 4 },
  weekDay: { width: `${100 / 7}%`, textAlign: 'center', fontWeight: '600' },
  grid: { paddingHorizontal: 4, paddingBottom: 12 },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', padding: 6 },
  dayText: { fontSize: 16, color: theme.darkText },
  todayText: { color: theme.secondary, fontWeight: '700' },
  selectedDay: { backgroundColor: 'rgba(74,144,226,0.12)', borderRadius: 8 },
  selectedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.primary, marginTop: 4 },
});
