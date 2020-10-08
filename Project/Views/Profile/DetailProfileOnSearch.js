import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { getAgeFromDate } from '../../Providers/TimeUtilsProvider';
import { mapPKToItems } from '../../Providers/StoreUtilProvider';
import LanguageProvider from '../../Providers/LanguageProvider';

import { AuthViewCheckProvider } from '../Components/AuthViewCheck';
import Actions from '../Components/Actions';
import { Layout } from '../../Theme/Layout';


const styles = StyleSheet.create({
  container: {
    position:  'relative'
  },
  gallery: {
    flex: 1,
    height: '50%'
  },
  imageGallery: {
    flex: 1,
    width: '100%'
  },
  scrollView: {
    flex: 1,
    padding: 18,
    width: '100%'
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 24
  },
  profileAge: {
    fontSize: 18
  },
  imageStar: {
    height: 20,
    width: 20
  },
  initSection: {
    marginBottom: 20
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
    zIndex: 1,
    width: '100%'
  }
});

class DetailProfileOnSearch extends React.Component {
  _getLangsFromProfile = profile => {
    return mapPKToItems(profile.languages, );
  }

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
        <Actions profile={profile}
                 actionsStyles={styles.actionsStyles}
                 navigation={this.props.navigation}
                 isDetail={true}></Actions>
      </View>
    );
  }
}
function mapStateToProps (state) {
  function _mapPKToServices(_state) {
    let services = {};
    Object.keys(_state.registerStatus.careListServicesAPIMap).forEach(careServiceKey => {
      const careServiceId = _state.registerStatus.careListServicesAPIMap[careServiceKey].id;
      const careServiceObj = _state.registerStatus.careListServices.find(
        careService => careService.name === careServiceKey);
      services[careServiceId] = careServiceObj;
    });
    return services;
  }

  return {
    langProvider: LanguageProvider(state.language),
    careServices: _mapPKToServices(state),
    listLanguages: state.availableLangs
  };
}
export default connect(mapStateToProps, null)(AuthViewCheckProvider(DetailProfileOnSearch));
