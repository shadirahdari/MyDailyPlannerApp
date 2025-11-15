import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: { padding: 12, backgroundColor: theme.card, borderRadius: 12, marginHorizontal: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700' },
  navButton: { padding: 8 },
  navText: { fontSize: 22 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 4 },
  weekDay: { width: `${100 / 7}%`, textAlign: 'center', fontWeight: '600' },
  grid: { paddingHorizontal: 4, paddingBottom: 12 },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', padding: 6 },
  dayText: { fontSize: 16, color: theme.darkText },
  todayText: { color: theme.secondary, fontWeight: '700' },
  selectedDay: { backgroundColor: 'rgba(74,144,226,0.12)', borderRadius: 8 },
  selectedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.primary, marginTop: 4 },
});
