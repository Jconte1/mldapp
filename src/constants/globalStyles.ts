import { StyleSheet } from 'react-native';
import { COLORS, FONT } from './theme';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    width: '100%',
    maxWidth: 300,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    ...FONT.header,
    marginBottom: 16,
  },
  text: {
    ...FONT.regular,
  },
});

export default globalStyles;
