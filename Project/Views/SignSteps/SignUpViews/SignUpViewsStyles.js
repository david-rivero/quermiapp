import { StyleSheet } from 'react-native';
import { Colors } from '../../../Theme/Colors';

export const carouselIndexStyles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'row',
    padding: 2,
    justifyContent: 'center'
  },
  carouselIndexItem: {
    borderColor: Colors.black,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    width: 12,
    height: 12,
    margin: 3
  },
  activeCarouselIndexItem: {
    backgroundColor: Colors.blue,
    borderWidth: 0
  }
});

export const signupViewsCarouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  subContainer: {
    flex: 1,
    margin: 5
  },
  signUpView: {
    flex: 1,
    justifyContent: 'center'
  },
  nextDisabledArea: {
    opacity: 0.5
  },
  footerSignUp: {
    backgroundColor: 'white',
    paddingTop: 5
  },
  buttonNext: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    marginRight: 10
  },
  actionSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nextCaretLogo: {
    width: 7,
    height: 10,
    marginLeft: 8
  },
  prevCaretLogo: {
    marginLeft: 0,
    marginRight: 8,
    transform: [{rotate: '180deg'}]
  },
  carouselCaretText: {
    fontSize: 16
  }
});
