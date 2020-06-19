import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const Layout = StyleSheet.create({
  container: {
    //fontFamily: 'Noto Sans JP, Sans Serif',
    fontSize: 18,
    height: '100%',
    width: '100%'
  },
  image: {
    width: '100%'
  },
  title: {
    //fontFamily: 'Lato, Sans Serif',
    fontSize: 24,
    fontWeight: '500'
  },
  text: {
    //fontFamily: 'Noto Sans JP, Sans Serif'
  },
  textInput: {
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.grey,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginVertical: 4
  }
});
export const BaseContainer = [Layout.container,];
