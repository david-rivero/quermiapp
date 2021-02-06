import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 60,
    width: 60,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  snapButton: {
    position: 'absolute',
    bottom: 20,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  savePhotoBtn: {
    color: 'white',
    fontSize: 14,
    textTransform: 'uppercase',
    marginLeft: 5,
    marginBottom: 5
  }
});

export default styles;
