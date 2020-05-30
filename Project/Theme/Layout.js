import { StyleSheet } from 'react-native';

export const Layout = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily: 'Noto Sans JP, Sans Serif',
    fontSize: 18,
    height: '100%',
    width: '100%'
  },
  image: {
    height: 'auto',
    width: '100%'
  }
});
export const BaseContainer = [Layout.container,];
