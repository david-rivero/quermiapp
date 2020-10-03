import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SWIPE_PROFILE } from '../../Store/Actions/ProfilesToSearch';

import Actions from '../Components/Actions';
import { Layout } from '../../Theme/Layout';
import store from '../../Store/store';
import ServiceEndpointProvider from '../../Providers/EndpointServiceProvider';

// Disable warnings!
// console.disableYellowBox = true;
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
const DISABLE_VERTICAL_SWIPE = true;
class SearchProfile extends React.Component {
  constructor(props) {
    super(props);
    ServiceEndpointProvider.registerEndpoint('contractsCreate', 'POST');
  }

  saveProfile = () => {

  }

  sendRequest = () => {

  }

  swipeProfile = currentIndex => {
    store.dispatch({
      type: SWIPE_PROFILE,
      payload: currentIndex
    });
  }

  loadDetailProfile = profile => {
    this.props.navigation.navigate('DetailProfileOnSearch', { profile: profile });
  };

  render() {
    const profile = this.props.profiles[this.props.currentProfileIndex];
    const isLastProfile = this.props.currentProfileIndex +1 === this.props.profiles.length;
    const isFirstProfile = this.props.currentProfileIndex === 0;

    return (
      <View style={[Layout.container, styles.container]}>
        <Swiper cards={this.props.profiles}
                goBackToPreviousCardOnSwipeRight={true}
                containerStyle={styles.cardProfile}
                onSwipedRight={cardIndex => this.swipeProfile(cardIndex -1)}
                onSwipedLeft={cardIndex => this.swipeProfile(cardIndex +1)}
                disableTopSwipe={DISABLE_VERTICAL_SWIPE}
                disableBottomSwipe={DISABLE_VERTICAL_SWIPE}
                disableLeftSwipe={isLastProfile}
                disableRightSwipe={isFirstProfile}
                useNativeDriver={false}
                renderCard={profile => {
                  return (
                    <TouchableOpacity style={styles.touchSection} onPress={() => this.loadDetailProfile(profile)}>
                      <View style={styles.gallery}>
                        <Image style={styles.imageGallery}
                              source={{uri: profile.pictsOnRegister.profilePhoto}}
                              resizeMode='cover' />
                      </View>
                      <View style={styles.initSection}>
                        <Text style={styles.profileName}>{profile.name.split(' ').shift()}</Text>
                        <View style={styles.starQContainer}>
                            {
                              Array.from(Array(5), (_, index) => {
                                let imageStar;
                                if (index + 1 <= profile.rate) {
                                  imageStar = require('../../Assets/images/star-selected.png')
                                } else {
                                  imageStar = require('../../Assets/images/star.png')
                                }
                                return <Image source={imageStar}
                                              style={styles.imageStar}
                                              resizeMode='contain'
                                              key={`star-profile-${index}`} />;
                              })
                            }
                          </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}>
          <Actions actionsStyles={styles.actionsStyles}
                   navigation={this.props.navigation}
                   profile={profile}></Actions>
        </Swiper>
      </View>
    );
  }  
}

function mapStateToProps(state) {
  return {
    currentProfileIndex: state.profileSearchStatus.currentProfileIndex,
    galleryEnabledIndex: state.profileSearchStatus.galleryEnabledIndex,
    profiles: state.profilesLoaded
  };
}

export default connect(mapStateToProps, null)(SearchProfile);
