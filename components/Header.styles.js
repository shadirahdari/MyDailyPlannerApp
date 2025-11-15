import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  side: { width: 48, alignItems: 'center', justifyContent: 'center' },
  iconButton: { padding: 6 },
  iconSpacer: { width: 24 },
  center: { flex: 1, alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 28, height: 28, marginRight: 8, borderRadius: 6, backgroundColor: '#eee' },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { marginTop: 2, fontSize: 12, color: '#666' },
});
