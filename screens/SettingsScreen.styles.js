import { StyleSheet } from 'react-native';
import theme from '../components/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { height: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: theme.darkText },
  headerIcon: { position: 'absolute', right: 16, top: 20 },
  scroll: { padding: 16, paddingBottom: 40 },
  box: {
    backgroundColor: theme.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
    // web box shadow
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)'
  },
  meterWrap: { marginTop: 12, flexDirection: 'row', alignItems: 'center' },
  meterBar: { flex: 1, height: 12, backgroundColor: '#eee', borderRadius: 8, overflow: 'hidden', marginRight: 10 },
  meterFill: { height: '100%', backgroundColor: '#ff8a65' },
  meterLabel: { width: 40, textAlign: 'right', color: theme.darkText },
  quote: { marginTop: 10, color: theme.darkText, fontStyle: 'italic' },
  profileBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12, backgroundColor: theme.light },
  profileText: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: theme.darkText },
  nameInput: { fontSize: 18, fontWeight: '600', color: theme.darkText, padding: 0 },
  profileSubtitle: { fontSize: 12, color: theme.lightText, marginTop: 4 },
  editButton: { padding: 8 },
  boxRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  boxTitle: { fontSize: 16, fontWeight: '600', color: theme.darkText },
  boxSubtitle: { fontSize: 13, color: theme.lightText, marginTop: 6 },
});

