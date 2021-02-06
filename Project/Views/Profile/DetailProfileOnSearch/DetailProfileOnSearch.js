import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView } from 'react-native';

import { getAgeFromDate } from '../../../Providers/TimeUtilsProvider';
import LanguageProvider from '../../../Providers/LanguageProvider';
import styles from './DetailProfileOnSearchStyles';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import { ProfileActions, ProfileActionsWrapper } from '../../Components/Actions/Actions';
import { Layout } from '../../../Theme/Layout';


class DetailProfileOnSearch extends React.Component {
  render() {
    const profile = this.props.route.params.profile;

    return (
      <View style={[Layout.container, styles.container]}>
        <View style={styles.gallery}>
          <Image style={styles.imageGallery}
                source={{uri: profile.pictsOnRegister.profilePhoto}}
                resizeMode='cover' />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.initSection}>
          <Text style={styles.profileName}>{profile.name.split(' ').shift()}</Text>
            <Text style={styles.profileAge}>{getAgeFromDate(profile.birthDate)} {this.props.langProvider.views.detailProfileOnSearch.yearLabel}</Text>
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
            <Text>{profile.description}</Text>
          </View>
          <View style={styles.descriptionSection}>
            <View style={styles.profileSectionInfo}>
            <Text style={styles.profileSectionTitle}>{this.props.langProvider.views.detailProfileOnSearch.servicesLabel}</Text>
              {
                profile.services.map((serviceId, index) => {
                  const label = this.props.careServices[serviceId].label;
                  const textLabel = this.props.langProvider.components.services[label];

                  return <Text key={`profile-service-${index}`}>{textLabel}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>{this.props.langProvider.views.detailProfileOnSearch.experienceLabel}</Text>
              {
                profile.experience.split(",").map((experience, index) => {
                  return <Text key={`profile-experience-${index}`}>{experience}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>{this.props.langProvider.views.detailProfileOnSearch.langLabel}</Text>
              {
                profile.languages.map((lang, index) => {
                  const languageObj = this.props.listLanguages.find(language => language.id === lang);
                  const textLabel = this.props.langProvider.components.lang[languageObj.name.toLowerCase()];
                  return <Text key={`profile-lang-${index}`}>{textLabel}</Text>;
                })
              }
            </View>
            <View>
              <Text style={styles.profileSectionTitle}>
                {this.props.langProvider.views.detailProfileOnSearch.timeAvailabilityLabel}:
              </Text>
              <Text>{profile.available_time}</Text>
            </View>
          </View>
        </ScrollView>
        <ProfileActions profile={profile}
                        actionsStyles={styles.actionsStyles}
                        navigation={this.props.navigation}
                        isDetail={true}
                        loveProfile={_ => this.props.loveProfile(profile)}
                        sendContactRequest={_ => this.props.sendContactRequest(profile, this.props.myProfile)}
                        rateProfile={_ => this.props.rateProfile(profile)}
                        acceptRequest={_ => this.props.acceptRequest(profile.contractWithCurrentProfile.contractId)} />
      </View>
    );
  }
}

function mapStateToProps (state) {
  function _mapPKToServices(_state) {
    let services = {};
    Object.keys(_state.categories.careListServices.careListServicesAPIMap).forEach(careServiceKey => {
      const careServiceId = _state.categories.careListServices.careListServicesAPIMap[careServiceKey].id;
      const careServiceObj = _state.categories.careListServices.careListServicesName.find(
        careService => careService.name === careServiceKey);
      services[careServiceId] = careServiceObj;
    });
    return services;
  }

  return {
    language: state.language,
    langProvider: LanguageProvider(state.language),
    careServices: _mapPKToServices(state),
    listLanguages: state.availableLangs,
    myProfile: state.profile,
    token: state._userToken.token
  };
}
export default connect(mapStateToProps, null)(
  AuthViewCheckProvider(ProfileActionsWrapper(DetailProfileOnSearch)));
