import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionItem: {
    borderRadius: 1000,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: 'black',
    shadowOpacity: 1.0
  },
  actionItemLeft: {
    marginRight: 12.5
  },
  actionItemCenter:{
    marginRight: 12.5,
    marginLeft: 12.5
  },
  actionItemRight: {
    marginLeft: 12.5
  },
  actionIcon: {
    height: 40,
    width: 40
  },
  actionIconCenter: {
    height: 50,
    width: 50
  },
  actionDetail: {
    backgroundColor: '#fafafa'
  },
});

export default styles;
