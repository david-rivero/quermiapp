import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position:  'relative',
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  cardProfile: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    borderRadius: 6
  },
  touchSection: {
    flex: 1,
    marginBottom: 30
  },
  gallery: {
    flex: 1,
    height: '50%'
  },
  imageGallery: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  imageStar: {
    height: 20,
    width: 20
  },
  initSection: {
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  starQContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  profileSectionInfo: {
    marginTop: 10,
    marginBottom: 10
  },
  descriptionSection: {
    marginBottom: 30
  },
  profileSectionTitle: {
    fontWeight: 'bold'
  },
  actionsStyles: {
    position: 'absolute',
    bottom: '2.5%',
    left: 0,
    width: '100%'
  }
});

export default styles;
