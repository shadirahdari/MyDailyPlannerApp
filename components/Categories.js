import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import theme from './theme';
import { MaterialIcons } from '@expo/vector-icons';

const DEFAULT_CATEGORIES = [
  { key: 'sport', label: 'Sport', icon: 'directions-run' },
  { key: 'cooking', label: 'Cooking', icon: 'restaurant' },
  { key: 'cleaning', label: 'Cleaning', icon: 'cleaning-services' },
  { key: 'shopping', label: 'Shopping', icon: 'shopping-cart' },
  { key: 'studying', label: 'Studying', icon: 'menu-book' },
  { key: 'relaxing', label: 'Relaxing', icon: 'self-improvement' },
  { key: 'musics', label: 'Musics', icon: 'music-note' },
];

export default function Categories({ categories = DEFAULT_CATEGORIES, selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {categories.map((c) => {
          const selected = selectedCategory === c.key;
          return (
            <TouchableOpacity
              key={c.key}
              style={[styles.chip, selected ? styles.chipSelected : null]}
              onPress={() => onSelectCategory && onSelectCategory(c.key)}
            >
              <MaterialIcons name={c.icon} size={18} color={selected ? '#fff' : theme.primary} />
              <Text style={[styles.label, selected ? styles.labelSelected : null]}>{c.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 8, backgroundColor: 'transparent' },
  scroll: { paddingLeft: 8, paddingRight: 16 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: theme.card, marginRight: 10, borderWidth: 1, borderColor: 'rgba(28,28,30,0.06)' },
  chipSelected: { backgroundColor: theme.primary, borderColor: 'rgba(0,0,0,0.06)' },
  label: { marginLeft: 8, color: theme.darkText, fontWeight: '600' },
  labelSelected: { color: '#fff' },
});
