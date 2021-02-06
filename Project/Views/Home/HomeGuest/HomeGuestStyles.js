import { StyleSheet } from 'react-native';
import { Colors } from '../../../Theme/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12
  },
  fullLogo: {
    flex: 0.5
  },
  loginActions: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed'
  },
  contentTop: {
    marginTop: 'auto'
  },
  button: {
    borderRadius: 2,
    height: 35,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonPrimary: {
    backgroundColor: Colors.blue,
    color: Colors.white
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    color: Colors.black
  }
});

export default styles;
