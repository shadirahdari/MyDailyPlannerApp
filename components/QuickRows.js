import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './QuickRows.styles';
import theme from './theme';
import { useNavigation } from '@react-navigation/native';

const ITEMS = [
  { key: 'todolists', label: 'To‑do Lists', icon: 'check-box', route: 'Tasks' },
  { key: 'pomodoro', label: 'Pomodoro', icon: 'timer', route: 'Pomodoro' },
  { key: 'habits', label: 'Habits', icon: 'repeat', route: 'Habits' },
  { key: 'diary', label: 'Diary', icon: 'menu-book', route: 'Diary' },
  { key: 'goals', label: 'Goals', icon: 'flag', route: 'Goals' },
];

export default function QuickRows() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {ITEMS.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.row}
          onPress={() => {
            try {
              navigation.navigate(item.route);
            } catch (e) {
              // route might not exist yet — fallback to Tasks
              navigation.navigate('Tasks');
            }
          }}
        >
          <MaterialIcons name={item.icon} size={22} color={theme.primary} />
          <View style={styles.rowText}>
            <Text style={styles.title}>{item.label}</Text>
            <Text style={styles.subtitle}>{`Open ${item.label}`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
