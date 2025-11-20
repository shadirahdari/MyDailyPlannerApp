import { StyleSheet } from 'react-native';
import theme from '../components/theme';

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.background },
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700', color: theme.darkText },
  closeIcon: { position: 'absolute', right: 0, top: 0, padding: 8 },
  dateText: { color: theme.lightText, marginBottom: 12 },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moodCell: { width: '30%', aspectRatio: 1, borderRadius: 12, backgroundColor: theme.card, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  moodCellActive: { borderWidth: 2, borderColor: theme.primary, transform: [{ scale: 1.03 }] },
  emoji: { fontSize: 32, marginBottom: 6 },
  moodLabel: { color: theme.darkText, fontWeight: '600' },
  moodLabelActive: { color: theme.primary },
  closeButton: { marginTop: 'auto', backgroundColor: theme.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontWeight: '700' },
  reasonInput: { marginTop: 12, minHeight: 60, padding: 10, backgroundColor: '#fff', borderRadius: 8, color: theme.darkText },
});
