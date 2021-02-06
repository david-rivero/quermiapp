import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SWIPE_PROFILE } from '../../../Store/Actions/ProfilesToSearch';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import { ProfileActions, ProfileActionsWrapper } from '../../Components/Actions/Actions';
import { Layout } from '../../../Theme/Layout';
import styles from './SearchProfileStyles';
import store from '../../../Store/store';

// Disable warnings!
// console.disableYellowBox = true;
const DISABLE_VERTICAL_SWIPE = true;

class SearchProfile extends React.Component {
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
    const currentProfile = this.props.profiles[this.props.currentProfileIndex];
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
                                  imageStar = require('../../../Assets/images/star-selected.png')
                                } else {
                                  imageStar = require('../../../Assets/images/star.png')
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
          <ProfileActions actionsStyles={styles.actionsStyles}
                          navigation={this.props.navigation}
                          profile={currentProfile}
                          loveProfile={_ => this.props.loveProfile(currentProfile)}
                          sendContactRequest={_ => this.props.sendContactRequest(currentProfile, this.props.myProfile)}
                          rateProfile={_ => this.props.rateProfile(currentProfile)}
                          acceptRequest={_ => this.props.acceptRequest(currentProfile.contractWithCurrentProfile.contractId)} />
        </Swiper>
      </View>
    );
  }  
}

function mapStateToProps(state) {
  return {
    language: state.language,
    currentProfileIndex: state.profileSearchStatus.currentProfileIndex,
    galleryEnabledIndex: state.profileSearchStatus.galleryEnabledIndex,
    profiles: state.profilesLoaded,
    myProfile: state.profile,
    token: state._userToken.token
  };
}

export default connect(mapStateToProps, null)(
  AuthViewCheckProvider(ProfileActionsWrapper(SearchProfile)));
