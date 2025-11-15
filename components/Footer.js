import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Footer({
  backgroundColor = '#fff',
  iconColor = '#111',
  onHomePress,
  onAddPress,
  onSettingsPress,
}) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity style={styles.button} onPress={onHomePress}>
          <MaterialIcons name="calendar-today" size={26} color={iconColor} />
          <Text style={[styles.label, { color: iconColor }]}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={onAddPress}>
          <MaterialIcons name="add-circle" size={52} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSettingsPress}>
          <MaterialIcons name="settings" size={26} color={iconColor} />
          <Text style={[styles.label, { color: iconColor }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { borderTopWidth: 1, borderTopColor: '#eee' },
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 8 },
  button: { alignItems: 'center', width: 80 },
  centerButton: { alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 12, marginTop: 2 },
});
