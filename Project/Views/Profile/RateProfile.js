import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import store from '../../Store/store';
import LanguageProvider from '../Providers/LanguageProvider';

import Header from '../Components/Header';

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
    marginVertical: 10
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

class RateProfile extends React.Component {
  // Remove component state
  state = {
    currentRateSelected: 0
  };
  
  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  selectRate = index => {
    this.setState({
      currentRateSelected: index + 1
    });
  }

  render() {
    const langProvider = LanguageProvider(store.getState().language);
    const caretLogo = require('../../Assets/caret-right.png');
    const profile = {
      imgProfile: require('../../Assets/felicia-varzari-8ZLLpY9r1cM-unsplash.jpg'),
      name: 'Fernando',
      rateQ: 4
    };

    return (
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.contentSection}>
          <View style={styles.headerRateProfile}>
            <Image source={profile.imgProfile} resizeMode='contain' style={styles.image} />
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
                    if (index + 1 <= profile.rateQ) {
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
          </View>
          <View>
            <View style={styles.rateSection}>
              <Text>{langProvider.views.rateProfile.rateProfileLabel}</Text>
              <View style={[styles.starContainer, styles.starContainerToSelect]}>
                {
                  Array.from(Array(5), (_, index) => {
                    let imageStar;
                    if (index + 1 <= this.state.currentRateSelected) {
                      imageStar = require('../../Assets/images/star-selected.png')
                    } else {
                      imageStar = require('../../Assets/images/star.png')
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
              <TextInput style={styles.textAreaComment} placeholder={langProvider.views.rateProfile.rateProfileCommentPlaceholder} />
            </View>
            <Button title={langProvider.views.rateProfile.rateProfileCommentAction} />
          </View>
        </View>
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
    language: state.language
  };
}
export default connect(mapStateToProps, null)(RateProfile);
