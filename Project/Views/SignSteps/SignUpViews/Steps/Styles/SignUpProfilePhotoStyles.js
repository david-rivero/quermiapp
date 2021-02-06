import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  inputContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  photoInput: {
    width: 135,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 50
  },
  inputEnabled: {
    borderWidth: 3,
    borderColor: '#F28998',
    padding: 5
  }
});

export default styles;
