import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  containerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: theme.card },
  list: { paddingHorizontal: 12 },
  dayItem: { alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  dayShort: { fontSize: 12, color: theme.lightText, marginBottom: 6 },
  dayCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' },
  dayNum: { fontSize: 16, color: theme.darkText },

  /* selected styles */
  dayItemSelected: {},
  dayShortSelected: { color: theme.primary, fontWeight: '700' },
  dayCircleSelected: { backgroundColor: theme.primary },
  dayNumSelected: { color: '#fff', fontWeight: '700' },

  /* nav buttons */
  navButton: { paddingHorizontal: 12, paddingVertical: 6 },
  navIcon: { fontSize: 22, color: theme.primary },
});
