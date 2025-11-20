import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: theme.card,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 0,
    width: '96%',
    maxWidth: 960,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
    // web box shadow for react-native-web
    boxShadow: '0px 1px 6px rgba(0,0,0,0.08)'
  },
  rowText: { marginLeft: 12 },
  title: { fontSize: 16, color: theme.darkText, fontWeight: '600' },
  subtitle: { fontSize: 12, color: theme.lightText, marginTop: 2 },
});
