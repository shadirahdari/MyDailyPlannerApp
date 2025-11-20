import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './SettingsScreen.styles';
import theme from '../components/theme';
import WeekDaysStrip from '../components/WeekDaysStrip';

export default function SettingsScreen() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Jane Doe');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => { /* reserved */ }}>
          <MaterialIcons name="settings" size={22} color={theme.darkText} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile box (first, brighter) */}
        <View style={[styles.box, styles.profileBox]}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: 'https://api.adorable.io/avatars/128/jane.png' }}
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              {editing ? (
                <TextInput
                  style={styles.nameInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                />
              ) : (
                <Text style={styles.name}>{name}</Text>
              )}
              <Text style={styles.profileSubtitle}>Personal info</Text>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
              <MaterialIcons name={editing ? 'check' : 'edit'} size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Moods: 7-day strip */}
        <View style={styles.box}>
          <View style={styles.boxRow}>
            <Text style={styles.boxTitle}>Moods</Text>
            <MaterialIcons name="mood" size={24} color={theme.lightText} />
          </View>
          <Text style={styles.boxSubtitle}>Track moods over the week</Text>
          <View style={{ marginTop: 12 }}>
            <WeekDaysStrip startDate={new Date()} onSelect={() => {}} />
          </View>
        </View>

        {/* Stress meter */}
        <View style={styles.box}>
          <View style={styles.boxRow}>
            <Text style={styles.boxTitle}>Stress Meter</Text>
            <MaterialIcons name="speed" size={22} color={theme.lightText} />
          </View>
          <Text style={styles.boxSubtitle}>Today's stress level</Text>
          <View style={styles.meterWrap}>
            <View style={styles.meterBar}>
              <View style={[styles.meterFill, { width: '45%' }]} />
            </View>
            <Text style={styles.meterLabel}>45%</Text>
          </View>
        </View>

        {/* Daily quote */}
        <View style={styles.box}>
          <View style={styles.boxRow}>
            <Text style={styles.boxTitle}>Daily Quote</Text>
            <MaterialIcons name="format-quote" size={22} color={theme.lightText} />
          </View>
          <Text style={styles.quote}>
            "Small steps every day lead to big changes over time." — Daily Inspiration
          </Text>
        </View>

        {/* Settings */}
        <TouchableOpacity style={styles.box} activeOpacity={0.8}>
          <View style={styles.boxRow}>
            <Text style={styles.boxTitle}>Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.lightText} />
          </View>
          <Text style={styles.boxSubtitle}>General app settings</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.box} activeOpacity={0.8}>
          <View style={styles.boxRow}>
            <Text style={styles.boxTitle}>About</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.lightText} />
          </View>
          <Text style={styles.boxSubtitle}>App version, help & feedback</Text>
        </TouchableOpacity>

        {/* Our Apps */}
        <TouchableOpacity style={styles.box} activeOpacity={0.8}>
          <View style={styles.boxRow}>
            <Text style={styles.boxTitle}>Our Apps</Text>
            <MaterialIcons name="apps" size={22} color={theme.lightText} />
          </View>
          <Text style={styles.boxSubtitle}>Other apps by our team</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}



