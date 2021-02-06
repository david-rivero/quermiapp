import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subView: {
    padding: 10,
    flex: 1
  },
  titleText: {
    fontWeight: 'bold',
    marginRight: 6
  },
  profileImg: {
    borderRadius: 100,
    height: 60,
    width: 60,
    marginRight: 16
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  notifSection: {
    flexDirection: 'row',
    marginBottom: 10
  },
  textName: {
    fontSize: 20
  },
  textUnread: {
    fontWeight: 'bold'
  },
  unreadNotif: {
    backgroundColor: 'red',
    color: 'white',
    width: 18,
    textAlign: 'center',
    borderRadius: 50,
    fontWeight: 'bold'
  },
  homeRedirectAction: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  homeRedirectionIcon: {
    marginRight: 5,
    width: 10,
    transform: [{rotate: '180deg'}]
  }
});

export default styles;
