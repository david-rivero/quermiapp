import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  radioBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#424242',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    paddingVertical: 12,
    marginBottom: 10
  },
  radioText: {
    flex: 1
  }
});

export default styles;
