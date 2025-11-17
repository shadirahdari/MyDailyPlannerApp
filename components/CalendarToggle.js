import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, Platform, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Calendar from './Calendar';
import theme from './theme';

export default function CalendarToggle({ onSelectDate }) {
  const [visible, setVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  // choose a comfortable modal width: prefer 520 on web, cap mobile to 360 or windowWidth-40
  const modalWidth = Platform.OS === 'web' ? 520 : Math.min(360, Math.max(280, windowWidth - 40));

  function handleSelect(date) {
    setVisible(false);
    onSelectDate && onSelectDate(date);
  }

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={{ padding: 10 }}>
        <MaterialIcons name="calendar-today" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal animationType="slide" visible={visible} transparent={true} onRequestClose={() => setVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: modalWidth, maxWidth: 520, borderRadius: 12, padding: 12, backgroundColor: theme.card }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setVisible(false)} style={{ padding: 8 }}>
                <MaterialIcons name="close" size={22} color={theme.darkText} />
              </TouchableOpacity>
            </View>

            <Calendar initialDate={new Date()} onSelectDate={handleSelect} />

            <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setVisible(false)} style={{ paddingVertical: 10, paddingHorizontal: 18, backgroundColor: theme.primary, borderRadius: 8 }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
