import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';
import styles from './CalendarScreen.styles';
import Calendar from '../components/Calendar';
import Header from '../components/Header';
import CalendarToggle from '../components/CalendarToggle';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import theme from '../components/theme';
import WeekDaysStrip from '../components/WeekDaysStrip';

export default function CalendarScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState(null);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handler = ({ window }) => setWindowWidth(window.width);
    const sub = Dimensions.addEventListener ? Dimensions.addEventListener('change', handler) : null;
    return () => {
      if (sub && sub.remove) sub.remove();
      else if (Dimensions.removeEventListener) Dimensions.removeEventListener('change', handler);
    };
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      setRefreshVersion((v) => v + 1);
    });
    return unsub;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header
        title="My Daily Planner"
        subtitle={new Date().toDateString()}
        onLeftPress={() => navigation.navigate('Settings')}
        rightIcon="settings"
        onRightPress={() => navigation.navigate('Settings')}
        rightComponent={<CalendarToggle onSelectDate={setSelected} />}
        logo={Platform.OS === 'web' ? require('../assets/logo.svg') : require('../assets/logoData').default}
      />

      <WeekDaysStrip startDate={new Date()} onSelect={(d) => setSelected(new Date(d.iso))} />

      <View style={styles.content}>
        <View style={styles.card}>
          {/* Show inline calendar only on larger screens; mobile/tablet will use header toggle modal */}
          {windowWidth >= 520 ? (
            <Calendar initialDate={new Date()} selectedDate={selected} onSelectDate={setSelected} refreshTrigger={refreshVersion} />
          ) : (
            <View style={{ paddingVertical: 12 }}>
              <Text style={{ color: '#666' }}>{selected ? selected.toDateString() : 'Tap the calendar icon to pick a date'}</Text>
            </View>
          )}
          {/* pass refresh trigger so calendar reloads tasks when screen regains focus */}
          <Categories selectedCategory={category} onSelectCategory={setCategory} />
        </View>
      </View>

      <View style={styles.selectionBar}>
        <Text style={styles.selectionText}>
          {selected ? `Selected: ${selected.toDateString()}` : 'No date selected'}
        </Text>
        <Text style={[styles.selectionText, { marginTop: 6 }]}>Category: {category ? category : 'None'}</Text>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  if (!selected) return;
                  const key = `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, '0')}-${String(selected.getDate()).padStart(2, '0')}`;
                  navigation.navigate('DayTasks', { date: key });
                }}
                style={{ alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: theme.primary, borderRadius: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>{selected ? 'View tasks for selected date' : 'Select a date to view tasks'}</Text>
              </TouchableOpacity>
            </View>
          </View>
      <Footer
        onHomePress={() => navigation.navigate('Calendar')}
        onAddPress={() => navigation.navigate('Add', { date: selected, category })}
        onSettingsPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

