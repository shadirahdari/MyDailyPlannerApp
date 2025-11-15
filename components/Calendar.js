import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from './theme';
import styles from './Calendar.styles';

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

export default function Calendar({ initialDate, selectedDate: selectedProp, onSelectDate, refreshTrigger }) {
  const today = new Date();
  const initial = initialDate ? new Date(initialDate.getFullYear(), initialDate.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1);
  const [viewDate, setViewDate] = useState(initial);
  const [selected, setSelected] = useState(selectedProp || null);

  useEffect(() => {
    if (selectedProp) setSelected(selectedProp);
  }, [selectedProp]);

  const cells = useMemo(() => getMonthData(viewDate.getFullYear(), viewDate.getMonth()), [viewDate]);
  const [tasksMap, setTasksMap] = useState({});

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

  function formatDateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  async function loadTasks() {
    try {
      const raw = await AsyncStorage.getItem('tasks');
      const tasks = raw ? JSON.parse(raw) : [];
      const map = {};
      tasks.forEach((t) => {
        // expect t.date in YYYY-MM-DD
        const key = t.date;
        if (!map[key]) map[key] = [];
        map[key].push(t);
      });
      setTasksMap(map);
    } catch (err) {
      console.error('Calendar loadTasks', err);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [viewDate, refreshTrigger]);

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
        {/* task dots */}
        {(() => {
          const key = formatDateKey(item);
          const tasks = tasksMap[key];
          if (!tasks || tasks.length === 0) return null;
          // show up to 3 colored dots based on category
          return (
            <View style={styles.taskDotsRow}>
              {tasks.slice(0, 3).map((t) => {
                const color = (theme.categoryColors && theme.categoryColors[t.category]) || theme.primary;
                return <View key={t.id} style={[styles.taskDot, { backgroundColor: color }]} />;
              })}
            </View>
          );
        })()}
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


