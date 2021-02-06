import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  contentSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 10
  },
  textProfileTitle: {
    fontSize: 16,
    textAlign: 'center'
  },
  inputContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  photoInput: {
    width: 135,
    height: 175,
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
  },
  savePhotoActionBtn: {
    borderRadius: 4,
    backgroundColor: '#4691F1',
    padding: 10
  },
  savePhotoActionBtnText: {
    color: 'white'
  },
  checkInProgressView: {
    flex: 1
  },
  checkInProgressTextContainer: {
    flex: 1,
    alignItems: 'center'
  },
  checkInProgressLogo: {
    width: 72
  },
  checkInProgressText: {
    fontSize: 16
  },
  homeRedirectAction: {
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
