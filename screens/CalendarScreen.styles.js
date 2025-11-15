import { StyleSheet } from 'react-native';
import theme from '../components/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundLight },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 12 },
  card: { width: '100%', maxWidth: 720 },
  selectionBar: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: theme.card },
  selectionText: { fontSize: 16, color: theme.darkText },
});
