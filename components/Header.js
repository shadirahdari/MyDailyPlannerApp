import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import styles from './Header.styles';
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


