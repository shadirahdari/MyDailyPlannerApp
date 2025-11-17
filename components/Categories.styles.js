import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 8, backgroundColor: 'transparent' },
  scroll: { paddingLeft: 8, paddingRight: 16, alignItems: 'center' },
  compactButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginBottom: 6 },
  expandedList: { marginTop: 8, maxHeight: 240, borderRadius: 12, backgroundColor: theme.card, paddingVertical: 6, paddingHorizontal: 6 },
  expandedScroll: { },
  expandedContent: { paddingBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, marginBottom: 6 },
  rowLabel: { marginLeft: 10, color: theme.darkText, fontWeight: '600' },
  rowLabelSelected: { color: '#fff' },
  colorDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12, marginLeft: 6 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: theme.card, borderWidth: 1, borderColor: 'rgba(28,28,30,0.06)' },
  chipSelected: { backgroundColor: theme.primary, borderColor: 'rgba(0,0,0,0.06)' },
  label: { marginLeft: 8, color: theme.darkText, fontWeight: '600' },
  labelSelected: { color: '#fff' },
});
