import React from 'react';
import { View } from 'react-native';
import Categories, { DEFAULT_CATEGORIES } from '../components/Categories';
import styles from './CategoriesScreen.styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};

  function handleSelect(key) {
    if (params.onSelect && typeof params.onSelect === 'function') {
      try { params.onSelect(key); } catch (e) {}
      navigation.goBack();
      return;
    }

    navigation.navigate(params.returnTo || 'Calendar', { selectedCategory: key });
  }

  return (
    <View style={styles.container}>
      <Categories
        categories={DEFAULT_CATEGORIES}
        inline={true}
        showCompact={false}
        selectedCategory={params.selectedCategory}
        onSelectCategory={handleSelect}
      />
    </View>
  );
}
