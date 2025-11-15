import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SettingsScreen.styles';
import { useNavigation } from '@react-navigation/native';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const sub = navigation.addListener('focus', load);
    load();
    return sub;
  }, []);

  async function load() {
    try {
      const raw = await AsyncStorage.getItem('tasks');
      setTasks(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error('Load tasks', err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Saved Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.04)' }}>
              <Text style={{ fontWeight: '700', color: '#111' }}>{item.title}</Text>
              <Text style={{ color: '#666' }}>{item.description}</Text>
              <Text style={{ color: '#999', marginTop: 4 }}>{item.date} • {item.category}</Text>
            </View>
          )}
        />

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
          <Text style={{ color: '#4A90E2' }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
