import { StyleSheet } from 'react-native';
import theme from '../components/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundLight, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: theme.card, padding: 20, borderRadius: 12, width: '90%', maxWidth: 720 },
  title: { fontSize: 20, fontWeight: '700', color: theme.darkText },
  sub: { marginTop: 8, color: theme.lightText },
});
