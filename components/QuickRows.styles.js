import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: theme.card, borderRadius: 10, marginBottom: 10 },
  rowText: { marginLeft: 12 },
  title: { fontSize: 16, color: theme.darkText, fontWeight: '600' },
  subtitle: { fontSize: 12, color: theme.lightText, marginTop: 2 },
});
