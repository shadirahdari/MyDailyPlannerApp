import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import styles from './Footer.styles';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme';

export default function Footer({
  backgroundColor = theme.primary,
  iconColor = '#fff',
  onHomePress,
  onAddPress,
  onSettingsPress,
}) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor, borderTopColor: 'rgba(0,0,0,0.08)' }]} {...(Platform.OS === 'web' ? { className: 'app-footer' } : {})}>
      <View style={[styles.container, { backgroundColor }]} {...(Platform.OS === 'web' ? { className: 'app-footer' } : {})}>
        <TouchableOpacity style={styles.button} onPress={onHomePress}>
          <MaterialIcons name="calendar-today" size={26} color={iconColor} />
          <Text style={[styles.label, { color: iconColor }]}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={onAddPress}>
          <MaterialIcons name="add-circle" size={56} color={theme.accent} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSettingsPress}>
          <MaterialIcons name="settings" size={26} color={iconColor} />
          <Text style={[styles.label, { color: iconColor }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


