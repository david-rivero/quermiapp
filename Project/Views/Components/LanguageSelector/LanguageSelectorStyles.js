import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flagImg: {
    width: 32,
    height: 21
  },
  caretLogo: {
    height: 12,
    width: 12,
    marginLeft: 8,
    transform: [{rotate: '90deg'}]
  }
});

export default styles;
