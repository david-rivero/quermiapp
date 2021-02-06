import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';
import { SET_RATE_INFO_PROFILE, RESET_RATE_INFO_PROFILE } from '../../../Store/Actions/DetailProfile';
import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';
import store from '../../../Store/store';
import { requestDataEndpoint, DEFAULT_HEADERS } from '../../../Providers/EndpointServiceProvider';
import styles from './RateProfileStyles';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import Header from '../../Components/Header/Header';

const langProvider = getLocalizedTextFromLang();
const caretLogo = require('../../../Assets/images/caret-right.png');

class RateProfile extends React.Component {
  redirectToHome = () => {
    this.props.navigation.navigate('RateProfileList');
  }

  sendRateInformation = () => {
    const data = {
      description: this.props.rateProfileInfo.description,
      rate: this.props.rateProfileInfo.rate,
      origin_profile: this.props.myProfile.id,
      profile_rated: this.props.route.params.profile.id
    };
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}` 
    };
    requestDataEndpoint('reports', data, 'POST', '', [], headers)
      .subscribe(reportsData => {
        if (!reportsData.error) {
          this.props.showNotification({
            title: langProvider.views.rateProfile.rateProfileNotifTitle,
            message: langProvider.views.rateProfile.rateProfileNotifMessage,
            vibrate: false
          });
          store.dispatch({
            type: RESET_RATE_INFO_PROFILE
          });
          this.props.navigation.navigate('HomeSignedIn');
        }
      });
  }

  selectRate = index => {
    store.dispatch({
      type: SET_RATE_INFO_PROFILE,
      payload: {
        ...this.props.rateProfileInfo,
        rate: index + 1
      }
    });
  }

  setDescriptionInfo = description => {
    store.dispatch({
      type: SET_RATE_INFO_PROFILE,
      payload: {
        ...this.props.rateProfileInfo,
        description: description
      }
    });
  }

  render() {
    const profile = this.props.route.params.profile;

    return (
      <View style={styles.container}>
        <Header isCarePerson={this.props.myProfile.profileRole === 'CARE_PROVIDER'} />
        <ScrollView style={styles.contentSection}>
          <View style={styles.headerRateProfile}>
            <Image source={{uri: profile.pictsOnRegister.profilePhoto}} resizeMode='contain' style={styles.image} />
            <View>
              <Text style={styles.profileName}>{profile.name}</Text>
              <View style={styles.reportActionsContainer}>
                <TouchableOpacity style={styles.reportActions}>
                  <Text style={styles.reportActionsText}>{langProvider.views.rateProfile.reportLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reportActions}>
                  <Text style={styles.reportActionsText}>{langProvider.views.rateProfile.blockLabel}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.starContainer}>
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
          </View>
          <View>
            <View style={styles.rateSection}>
              <Text>{langProvider.views.rateProfile.rateProfileLabel}</Text>
              <View style={[styles.starContainer, styles.starContainerToSelect]}>
                {
                  Array.from(Array(5), (_, index) => {
                    let imageStar;
                    if (index + 1 <= this.props.rateProfileInfo.rate) {
                      imageStar = require('../../../Assets/images/star-selected.png')
                    } else {
                      imageStar = require('../../../Assets/images/star.png')
                    }

                    return (
                      <TouchableOpacity onPress={() => this.selectRate(index)} key={`star-q-profile-${index}`}>
                        <Image source={imageStar}
                               style={styles.imageStarToSelect}
                               resizeMode='contain' />
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            </View>
            <View style={styles.rateSection}>
              <Text>{langProvider.views.rateProfile.rateProfileCommentDesc} {profile.name}</Text>
              <TextInput onChangeText={this.setDescriptionInfo} style={styles.textAreaComment} placeholder={langProvider.views.rateProfile.rateProfileCommentPlaceholder} />
            </View>
            <Button title={langProvider.views.rateProfile.rateProfileCommentAction} onPress={this.sendRateInformation} />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToHome()}>
          <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
          <Text>{langProvider.components.backButton.backLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    rateProfileInfo: state.rateProfileInfo,
    myProfile: state.profile,
    token: state._userToken.token
  };
}
export default connect(mapStateToProps, null)(
  withInAppNotification(AuthViewCheckProvider(RateProfile)));
