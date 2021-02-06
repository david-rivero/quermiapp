import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';
import { connect } from 'react-redux';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import Header from '../../Components/Header/Header';
import styles from './RateProfileListStyles';

const langProvider = getLocalizedTextFromLang();
const caretLogo = require('../../../Assets/images/caret-right.png');


class RateProfileList extends React.Component {
  redirectToRateProfile = profile => {
    this.props.navigation.navigate('RateProfile', { profile: profile })
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isCarePerson={this.props.myProfile.profileRole === 'CARE_PROVIDER'} />
        <View style={styles.subView}>
          <Text style={styles.viewTitle}>{langProvider.views.rateProfileList.title}</Text>
          <ScrollView style={styles.scrollSection}>
            {
              this.props.profiles.map((profile, index) => {
                if (profile.contractWithCurrentProfile && 
                  ['CADD', 'CACT'].find(i => i === profile.contractWithCurrentProfile.type)) {
                  return (
                    <View key={`rate-profile-item-${index}`}>
                      <TouchableOpacity style={styles.chatItem} onPress={() => this.redirectToRateProfile(profile)}>
                        <Image source={{uri: profile.pictsOnRegister.profilePhoto}}
                               style={styles.profileImg}
                               resizeMode='cover' />
                        <View>
                          <Text style={styles.textName}>{profile.name}</Text>
                          <View style={styles.starContainer}>
                            {
                              Array.from(Array(5), (_, ix) => {
                                let imageStar;
                                if (ix + 1 <= profile.rate) {
                                  imageStar = require('../../../Assets/images/star-selected.png')
                                } else {
                                  imageStar = require('../../../Assets/images/star.png')
                                }
                                return <Image source={imageStar}
                                              style={styles.imageStar}
                                              resizeMode='contain'
                                              key={`star-profile-${ix}`} />;
                              })
                            }
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })
            }
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToHome()}>
          <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
          <Text>{langProvider.components.backButton.backLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    profiles: state.profilesLoaded,
    myProfile: state.profile
  }
}
export default connect(mapStateToProps, null)(AuthViewCheckProvider(RateProfileList));
