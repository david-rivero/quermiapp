import { StyleSheet } from 'react-native';
import { Colors } from '../../../Theme/Colors';

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  headerCareProvider: {
    backgroundColor: Colors.pink
  },
  imgContainer: {
    width: 32
  },
  menuIconLink: {
    height: 24,
    width: 24,
    position: 'absolute',
    right: 10,
    top: 20,
    zIndex: 10
  },
  menuIcon: {
    height: '100%',
    width: '100%'
  },
  img: {
    width: '100%'
  }
});

export default styles;
