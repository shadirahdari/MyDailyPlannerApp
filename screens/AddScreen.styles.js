import { StyleSheet } from 'react-native';
import theme from '../components/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundLight, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: theme.card, padding: 20, borderRadius: 12, width: '90%', maxWidth: 720 },
  title: { fontSize: 20, fontWeight: '700', color: theme.darkText },
  sub: { marginTop: 8, color: theme.lightText },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    color: theme.darkText,
    backgroundColor: '#fff',
  },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  button: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8 },
  buttonPrimary: { backgroundColor: theme.primary },
  buttonText: { color: '#fff', fontWeight: '600' },
});
