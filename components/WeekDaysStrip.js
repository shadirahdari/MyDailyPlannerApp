import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from './WeekDaysStrip.styles';
import theme from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatDay(date) {
  return {
    short: date.toLocaleDateString(undefined, { weekday: 'short' }),
    day: date.getDate(),
    iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
  };
}

export default function WeekDaysStrip({ startDate = new Date(), onSelect }) {
  // compute week start (Sunday) from a given date
  function getWeekStart(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const offset = d.getDay();
    d.setDate(d.getDate() - offset);
    return d;
  }

  const [weekStart, setWeekStart] = useState(() => getWeekStart(startDate));

  // build 7 days starting from weekStart
  const days = useMemo(() => {
    const d = new Date(weekStart);
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const dd = new Date(d);
      dd.setDate(d.getDate() + i);
      arr.push(formatDay(dd));
    }
    return arr;
  }, [weekStart]);

  const [selectedIso, setSelectedIso] = useState(days[0]?.iso);
  const [moodsMap, setMoodsMap] = useState({});

  // if the days change and the selected iso isn't present, reset selection
  useEffect(() => {
    if (!days.find((x) => x.iso === selectedIso)) {
      setSelectedIso(days[0]?.iso);
    }
  }, [days]);

  async function loadMoods() {
    try {
      const raw = await AsyncStorage.getItem('moods');
      const map = raw ? JSON.parse(raw) : {};
      setMoodsMap(map || {});
    } catch (e) {
      // ignore
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadMoods();
    }, [weekStart])
  );

  function handlePrevWeek() {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  }

  function handleNextWeek() {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  }

  const navigation = useNavigation();

  function renderItem({ item }) {
    const selected = item.iso === selectedIso;
    const mood = moodsMap[item.iso];
    return (
      <TouchableOpacity
        style={[styles.dayItem, selected && styles.dayItemSelected]}
        onPress={() => {
          setSelectedIso(item.iso);
          onSelect && onSelect(item);
          try {
            navigation.navigate('Moods', { dateIso: item.iso });
          } catch (e) {
            // navigation might not be available in non-navigated contexts
          }
        }}
      >
        <Text style={[styles.dayShort, selected && styles.dayShortSelected]}>{item.short}</Text>
        <View style={[styles.dayCircle, selected && styles.dayCircleSelected]}>
          {mood && mood.mood ? (
            <Text style={[styles.dayNum, selected && styles.dayNumSelected]}>{getEmojiForMood(mood.mood)}</Text>
          ) : (
            <Text style={[styles.dayNum, selected && styles.dayNumSelected]}>{item.day}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  function getEmojiForMood(key) {
    const map = {
      bad: '😞',
      poor: '😕',
      neutral: '😐',
      good: '🙂',
      great: '😃',
      excellent: '🤩',
    };
    return map[key] || '•';
  }

  return (
    <View style={styles.containerRow}>
      <TouchableOpacity style={styles.navButton} onPress={handlePrevWeek}>
        <Text style={styles.navIcon}>{'‹'}</Text>
      </TouchableOpacity>

      <FlatList
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.iso}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.navButton} onPress={handleNextWeek}>
        <Text style={styles.navIcon}>{'›'}</Text>
      </TouchableOpacity>
    </View>
  );
}
