import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import styles from './CalendarScreen.styles';
import Calendar from '../components/Calendar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import theme from '../components/theme';

export default function CalendarScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState(null);

  return (
    <View style={styles.container}>
      <Header
        title="My Daily Planner"
        subtitle={new Date().toDateString()}
        onLeftPress={() => navigation.navigate('Settings')}
        rightIcon="settings"
        onRightPress={() => navigation.navigate('Settings')}
        logo={Platform.OS === 'web' ? require('../assets/logo.svg') : require('../assets/logoData').default}
      />

      <View style={styles.content}>
        <View style={styles.card}>
          <Calendar initialDate={new Date()} selectedDate={selected} onSelectDate={setSelected} />
          <Categories selectedCategory={category} onSelectCategory={setCategory} />
        </View>
      </View>

      <View style={styles.selectionBar}>
        <Text style={styles.selectionText}>
          {selected ? `Selected: ${selected.toDateString()}` : 'No date selected'}
        </Text>
        <Text style={[styles.selectionText, { marginTop: 6 }]}>Category: {category ? category : 'None'}</Text>
      </View>
      <Footer
        onHomePress={() => navigation.navigate('Calendar')}
        onAddPress={() => navigation.navigate('Add')}
        onSettingsPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

