import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import theme from './theme';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Categories.styles';

export const DEFAULT_CATEGORIES = [
  { key: 'sport', label: 'Sport', icon: 'directions-run' },
  { key: 'cooking', label: 'Cooking', icon: 'restaurant' },
  { key: 'cleaning', label: 'Cleaning', icon: 'cleaning-services' },
  { key: 'shopping', label: 'Shopping', icon: 'shopping-cart' },
  { key: 'studying', label: 'Studying', icon: 'menu-book' },
  { key: 'relaxing', label: 'Relaxing', icon: 'self-improvement' },
  { key: 'musics', label: 'Musics', icon: 'music-note' },
];

export default function Categories({ categories = DEFAULT_CATEGORIES, selectedCategory, onSelectCategory }) {
  const [expanded, setExpanded] = useState(false);

  const current = categories.find((c) => c.key === selectedCategory) || categories[0];
  const currentColor = (theme.categoryColors && theme.categoryColors[current.key]) || theme.primary;

  function handleSelect(key) {
    onSelectCategory && onSelectCategory(key);
    setExpanded(false);
  }

  return (
    <View style={styles.container}>
      {/* Compact button showing current category color/icon */}
      <TouchableOpacity style={[styles.compactButton, { backgroundColor: currentColor }]} onPress={() => setExpanded((v) => !v)}>
        <MaterialIcons name={current.icon} size={20} color="#fff" />
      </TouchableOpacity>

      {/* Expandable horizontal list */}
      {expanded ? (
        <View style={styles.expandedList}>
          <ScrollView style={styles.expandedScroll} contentContainerStyle={styles.expandedContent} showsVerticalScrollIndicator={true}>
            {categories.map((c) => {
              const color = (theme.categoryColors && theme.categoryColors[c.key]) || theme.primary;
              const selected = selectedCategory === c.key;
              return (
                <TouchableOpacity
                  key={c.key}
                  style={[styles.row, selected ? { backgroundColor: color } : null]}
                  onPress={() => handleSelect(c.key)}
                >
                  <View style={[styles.colorDot, { backgroundColor: color }]} />
                  <MaterialIcons name={c.icon} size={18} color={selected ? '#fff' : theme.darkText} />
                  <Text style={[styles.rowLabel, selected ? styles.rowLabelSelected : null]}>{c.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}


