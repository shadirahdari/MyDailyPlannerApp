import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SettingsScreen.styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import theme from '../components/theme';

function formatDateKey(d) {
  if (!d) return '';
  const day = new Date(d);
  const yyyy = day.getFullYear();
  const mm = String(day.getMonth() + 1).padStart(2, '0');
  const dd = String(day.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function DayTasksScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { date } = route.params || {};
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const sub = navigation.addListener('focus', load);
    load();
    return sub;
  }, [date]);

  async function load() {
    try {
      const raw = await AsyncStorage.getItem('tasks');
      const all = raw ? JSON.parse(raw) : [];
      const key = formatDateKey(date);
      const filtered = all.filter((t) => t.date === key);
      setTasks(filtered);
    } catch (err) {
      console.error('DayTasks load', err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Tasks for {date ? new Date(date).toDateString() : 'Selected day'}</Text>

        {tasks.length === 0 ? (
          <Text style={styles.sub}>No tasks for this date.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.04)' }}>
                <Text style={{ fontWeight: '700', color: theme.darkText }}>{item.title}</Text>
                {item.description ? <Text style={{ color: theme.lightText }}>{item.description}</Text> : null}
                <Text style={{ marginTop: 6, color: theme.lightText }}>{item.category}</Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
          <Text style={{ color: theme.primary }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
