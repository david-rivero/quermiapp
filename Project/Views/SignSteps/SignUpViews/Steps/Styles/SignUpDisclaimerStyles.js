import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textContainer: {
    flex: 1,
    marginBottom: '100%'
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -25,
    marginBottom: 10
  },
  checkboxDisclaimerText: {
    flex: 1
  }
});

export default styles;
