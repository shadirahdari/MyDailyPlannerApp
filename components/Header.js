import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme';

export default function Header({
  title = 'My Daily Planner',
  subtitle,
  backgroundColor = theme.primary,
  titleColor = '#fff',
  logo, // optional image uri string
  leftIcon = 'menu',
  onLeftPress,
  rightIcon = null,
  onRightPress,
}) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} {...(Platform.OS === 'web' ? { className: 'app-header' } : {})}>
      <View style={[styles.container, { backgroundColor }]} {...(Platform.OS === 'web' ? { className: 'app-header' } : {})}>
        <View style={styles.side}>
          {onLeftPress ? (
            <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
              <MaterialIcons name={leftIcon} size={24} color={titleColor} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconSpacer} />
          )}
        </View>

        <View style={styles.center}>
          <View style={styles.titleRow}>
              {logo ? <Image source={{ uri: logo }} style={styles.logo} /> : null}
            <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>{title}</Text>
          </View>
          {subtitle ? <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.9)' }]}>{subtitle}</Text> : null}
        </View>

        <View style={styles.side}>
          {rightIcon && onRightPress ? (
            <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
              <MaterialIcons name={rightIcon} size={24} color={titleColor} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconSpacer} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  side: { width: 48, alignItems: 'center', justifyContent: 'center' },
  iconButton: { padding: 6 },
  iconSpacer: { width: 24 },
  center: { flex: 1, alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 28, height: 28, marginRight: 8, borderRadius: 6, backgroundColor: '#eee' },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { marginTop: 2, fontSize: 12, color: '#666' },
});
