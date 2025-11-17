import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
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
  const [hoverKey, setHoverKey] = useState(null);

  function handleSelect(key) {
    onSelectCategory && onSelectCategory(key);
    setExpanded(false);
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

  function isDark(hex) {
    try {
      const { r, g, b } = hexToRgb(hex);
      // relative luminance
      const [R, G, B] = [r, g, b].map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
      return lum < 0.5;
    } catch (e) {
      return false;
    }
  }

  return (
    <View style={styles.container}>
      {/* Compact button showing current category color/icon */}
      <TouchableOpacity style={[styles.compactButton, { backgroundColor: currentColor }]} onPress={() => setExpanded((v) => !v)}>
        <MaterialIcons name={current.icon} size={20} color="#fff" />
      </TouchableOpacity>

      {/* Expandable horizontal list */}
      {expanded ? (
        <Modal animationType="fade" transparent={true} visible={expanded} onRequestClose={() => setExpanded(false)}>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContainer} pointerEvents="box-none">
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setExpanded(false)} style={styles.modalCloseButton}>
                  <MaterialIcons name="close" size={18} color={theme.darkText} />
                </TouchableOpacity>
              </View>

              <View style={styles.expandedList}>
                <ScrollView style={styles.expandedScroll} contentContainerStyle={styles.expandedContent} showsVerticalScrollIndicator={true}>
                  {categories.map((c) => {
                    const color = (theme.categoryColors && theme.categoryColors[c.key]) || theme.primary;
                    const selected = selectedCategory === c.key;
                    const textColor = isDark(color) ? '#fff' : '#111';
                    return (
                      <TouchableOpacity
                        key={c.key}
                        style={[styles.row, { backgroundColor: color }]}
                        onPress={() => handleSelect(c.key)}
                        onMouseEnter={() => Platform.OS === 'web' && setHoverKey(c.key)}
                        onMouseLeave={() => Platform.OS === 'web' && setHoverKey(null)}
                      >
                        <MaterialIcons name={c.icon} size={18} color={textColor} />
                        <Text style={[styles.rowLabel, { color: textColor }]}>{c.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}


