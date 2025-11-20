import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import styles from './Footer.styles';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme';
import CalendarToggle from './CalendarToggle';
import Categories from './Categories';

export default function Footer({
  backgroundColor = theme.primary,
  iconColor = '#fff',
  onHomePress,
  onAddPress,
  onSelectDate,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor, borderTopColor: 'rgba(0,0,0,0.08)' }]} {...(Platform.OS === 'web' ? { className: 'app-footer' } : {})}>
      <View style={[styles.container, { backgroundColor }]} {...(Platform.OS === 'web' ? { className: 'app-footer' } : {})}>
        <View style={[styles.button, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
          <CalendarToggle onSelectDate={onSelectDate} />
          <Categories selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
        </View>

        <TouchableOpacity style={styles.centerButton} onPress={onAddPress}>
          <MaterialIcons name="add-circle" size={56} color={theme.accent} />
        </TouchableOpacity>

        {/* Settings button removed per request */}
      </View>
    </SafeAreaView>
  );
}


