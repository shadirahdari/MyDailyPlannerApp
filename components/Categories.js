import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import theme from './theme';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Categories.styles';

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


