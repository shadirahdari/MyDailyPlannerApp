import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 8, backgroundColor: 'transparent' },
  scroll: { paddingLeft: 8, paddingRight: 16 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: theme.card, marginRight: 10, borderWidth: 1, borderColor: 'rgba(28,28,30,0.06)' },
  chipSelected: { backgroundColor: theme.primary, borderColor: 'rgba(0,0,0,0.06)' },
  label: { marginLeft: 8, color: theme.darkText, fontWeight: '600' },
  labelSelected: { color: '#fff' },
});
