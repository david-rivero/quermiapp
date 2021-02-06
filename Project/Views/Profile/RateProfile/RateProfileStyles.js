import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentSection: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 10
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  headerRateProfile: {
    flexDirection: 'row',
    marginBottom: 20
  },
  image: {
    height: 75,
    width: 75
  },
  reportActionsContainer: {
    flexDirection: 'row'
  },
  reportActions: {
    marginRight: 10
  },
  reportActionsText: {
    textDecorationLine: 'underline'
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  imageStar: {
    height: 20,
    width: 20
  },
  starContainerToSelect: {
    justifyContent: 'center',
    marginVertical: 10
  },
  imageStarToSelect: {
    height: 40,
    width: 40,
    marginHorizontal: 5
  },
  textAreaComment: {
    backgroundColor: 'transparent',
    marginVertical: 10,
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 1
  },
  rateSection: {
    marginVertical: 15
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
