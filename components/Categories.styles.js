import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 8, backgroundColor: 'transparent' },
  scroll: { paddingLeft: 8, paddingRight: 16, alignItems: 'center' },
  compactButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginBottom: 6 },
  expandedList: { marginTop: 0, maxHeight: 420, borderRadius: 10, backgroundColor: 'transparent', paddingVertical: 6, paddingHorizontal: 0, width: '100%' },
  expandedScroll: { },
  expandedContent: { paddingBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, marginBottom: 8, width: '100%' },
  rowLabel: { marginLeft: 12, color: theme.darkText, fontWeight: '600' },
  rowLabelSelected: { color: '#fff' },
  colorDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12, marginLeft: 6 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: theme.card, borderWidth: 1, borderColor: 'rgba(28,28,30,0.06)' },
  modalBackdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.48)' },
  modalContainer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalCard: { width: '92%', maxWidth: 520, borderRadius: 14, padding: 12, backgroundColor: theme.card, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 6 },
  modalHeader: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 6, marginBottom: 8 },
  modalCloseButton: { padding: 6 },
  chipSelected: { backgroundColor: theme.primary, borderColor: 'rgba(0,0,0,0.06)' },
  label: { marginLeft: 8, color: theme.darkText, fontWeight: '600' },
  labelSelected: { color: '#fff' },
});
