import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import LanguageProvider from '../../Providers/LanguageProvider';
import { connect } from 'react-redux';

import Header from '../Components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subView: {
    padding: 10,
    flex: 1
  },
  titleText: {
    fontWeight: 'bold',
    marginRight: 6
  },
  profileImg: {
    borderRadius: 100,
    height: 60,
    width: 60,
    marginRight: 16
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  textName: {
    fontSize: 20
  },
  homeRedirectAction: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  homeRedirectionIcon: {
    marginRight: 5,
    width: 10,
    transform: [{rotate: '180deg'}]
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  imageStar: {
    height: 20,
    width: 20
  },
  viewTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  }
});

class RateProfileList extends React.Component {
  redirectToRateProfile = profile => {
    this.props.navigation.navigate('RateProfile', { profile: profile })
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const caretLogo = require('../../Assets/caret-right.png');

    return (
      <View style={styles.container}>
        <Header isCarePerson={this.props.myProfile.profileRole === 'CARE_PROVIDER'} />
        <View style={styles.subView}>
          <Text style={styles.viewTitle}>{langProvider.views.rateProfileList.title}</Text>
          <ScrollView style={styles.scrollSection}>
            {
              this.props.profiles.map((profile, index) => {
                if (profile.contractWithCurrentProfile) {
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
    language: state.language,
    profiles: state.profilesLoaded,
    myProfile: state.profile
  }
}
export default connect(mapStateToProps, null)(RateProfileList);
