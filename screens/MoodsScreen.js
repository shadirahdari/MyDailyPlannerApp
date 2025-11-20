import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './MoodsScreen.styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';

const MOODS = [
  { key: 'bad', label: 'Bad', emoji: '😞' },
  { key: 'poor', label: 'Poor', emoji: '😕' },
  { key: 'neutral', label: 'Neutral', emoji: '😐' },
  { key: 'good', label: 'Good', emoji: '🙂' },
  { key: 'great', label: 'Great', emoji: '😃' },
  { key: 'excellent', label: 'Excellent', emoji: '🤩' },
];

export default function MoodsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dateIso = route.params?.dateIso;
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState('');

  function handleChoose(mood) {
    setSelected(mood.key);
    // TODO: persist mood for dateIso (AsyncStorage) if desired
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>How do you feel today?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIcon}>
            <MaterialIcons name="close" size={22} color={theme.lightText} />
          </TouchableOpacity>
        </View>

        <Text style={styles.dateText}>{dateIso || ''}</Text>


        <View style={styles.moodGrid}>
          {MOODS.map((m) => {
            const active = selected === m.key;
            return (
              <TouchableOpacity key={m.key} style={[styles.moodCell, active && styles.moodCellActive]} onPress={() => handleChoose(m)}>
                <Text style={styles.emoji}>{m.emoji}</Text>
                <Text style={[styles.moodLabel, active && styles.moodLabelActive]}>{m.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TextInput
          style={styles.reasonInput}
          placeholder="Add a reason (optional)"
          value={route.params?.reason || ''}
          onChangeText={(t) => setReason(t)}
          multiline
        />

        <TouchableOpacity
          style={styles.closeButton}
          onPress={async () => {
            // persist mood + reason for this date
            try {
              if (selected) {
                const raw = await AsyncStorage.getItem('moods');
                const map = raw ? JSON.parse(raw) : {};
                map[dateIso || new Date().toISOString().slice(0,10)] = { mood: selected, reason: reason || '', date: dateIso };
                await AsyncStorage.setItem('moods', JSON.stringify(map));
              }
            } catch (e) {
              // ignore
            }
            navigation.goBack();
          }}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
