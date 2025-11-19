import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './WeekDaysStrip.styles';
import theme from './theme';

function formatDay(date) {
  return {
    short: date.toLocaleDateString(undefined, { weekday: 'short' }),
    day: date.getDate(),
    iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
  };
}

export default function WeekDaysStrip({ startDate = new Date(), onSelect }) {
  // build 7 days starting from startDate (start of week)
  const days = useMemo(() => {
    const d = new Date(startDate);
    d.setHours(0,0,0,0);
    // move to sunday of that week
    const offset = d.getDay();
    d.setDate(d.getDate() - offset);
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const dd = new Date(d);
      dd.setDate(d.getDate() + i);
      arr.push(formatDay(dd));
    }
    return arr;
  }, [startDate]);

  const [selectedIso, setSelectedIso] = useState(days[0]?.iso);

  function renderItem({ item }) {
    const selected = item.iso === selectedIso;
    return (
      <TouchableOpacity style={[styles.dayItem, selected && styles.dayItemSelected]} onPress={() => { setSelectedIso(item.iso); onSelect && onSelect(item); }}>
        <Text style={[styles.dayShort, selected && styles.dayShortSelected]}>{item.short}</Text>
        <View style={[styles.dayCircle, selected && styles.dayCircleSelected]}>
          <Text style={[styles.dayNum, selected && styles.dayNumSelected]}>{item.day}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.iso}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
