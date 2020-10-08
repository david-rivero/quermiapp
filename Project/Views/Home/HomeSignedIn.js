import * as React from 'react';
import { connect } from 'react-redux';
import { concatMap } from 'rxjs/operators';

import { View, Text, Image, TouchableOpacity, BackHandler, StyleSheet } from 'react-native';
import { Layout } from '../../Theme/Layout';
import { Colors } from '../../Theme/Colors';
import { LOAD_PROFILES_TO_SEARCH, SET_ENABLED_CONTRACTS } from '../../Store/Actions/ProfilesToSearch';
import { TOGGLE_MENU_OPEN } from '../../Store/Actions/DetailProfile';
import LanguageProvider from '../../Providers/LanguageProvider';
import { requestDataEndpoint, DEFAULT_HEADERS } from '../../Providers/EndpointServiceProvider';
import store from '../../Store/store';

import { AuthViewCheckProvider } from '../Components/AuthViewCheck';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  container: {
    width: '100%',
  },
  containerMenuOpen: {
    transform: [{translateX: -200}]
  },
  mainActionContent: {
    backgroundColor: Colors.blue,
    height: '30%',
    width: '100%',
    padding: 18
  },
  mainActionCareProvider: {
    backgroundColor: Colors.pink
  },
  mainActionText: {
    color: Colors.white
  },
  homeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32
  },
  homeTitleIcon: {
    marginRight: 12,
    width: 22
  },
  homeViewContent: {
    padding: 18
  },
  homeSubView: {
    marginBottom: 15
  },
  homeRedirectAction: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeRedirectionIcon: {
    marginLeft: 5,
    width: 10
  }
});

class HomeSignedIn extends React.Component {
  fakeBackPress = () => {
    return true;
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress', this.fakeBackPress);
    });
    this.props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress', this.fakeBackPress);
    });

    let profileRoleToSearch;
    let queryFieldToContract;
    if (this.props.profile.profileRole === 'PATIENT') {
      profileRoleToSearch = 'CARE_PROVIDER';
      queryFieldToContract = 'patient__user__username';
    } else {
      profileRoleToSearch = 'PATIENT';
      queryFieldToContract = 'care_person__user__username';
    }
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    const contractsObservable = requestDataEndpoint(
      'contracts', undefined, 'GET', `${queryFieldToContract}=${this.props.profile.username}`, [], headers);
    requestDataEndpoint('profile', undefined, 'GET', `role=${profileRoleToSearch}`).pipe(
      concatMap(data => {
        store.dispatch({
          type: LOAD_PROFILES_TO_SEARCH,
          payload: data
        });
        return contractsObservable;
      })
    ).subscribe(contractsData => {
      store.dispatch({
        type: SET_ENABLED_CONTRACTS,
        payload: {
          contracts: contractsData,
          profileFromId: this.props.profile.id,
          profileRole: this.props.profile.profileRole
        }
      });
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.fakeBackPress);
  }

  redirectToSearchProfile = () => {
    this.props.navigation.navigate('SearchProfile');
  }

  redirectToChatGroup = () => {
    this.props.navigation.navigate('ChatList');
  }

  redirectToRateProfile = () => {
    this.props.navigation.navigate('RateProfileList');
  }

  openMenu = () => {
    store.dispatch({
      type: TOGGLE_MENU_OPEN,
      payload: !this.props.menuOpened
    });
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const caretLogoWhite = require('../../Assets/caret-right-white.png');
    const caretLogo = require('../../Assets/caret-right.png');
    const profilesLoadedWithContract = this.props.profilesLoaded.filter(
      profile => profile.contractWithCurrentProfile);

    return (
      <View style={[styles.superContainer]}>
        <View style={[Layout.container, styles.container, this.props.menuOpened ? styles.containerMenuOpen : null]}>
          <Header onOpenMenu={this.openMenu} isCarePerson={this.props.profile.profileRole === 'CARE_PROVIDER'} />
          <View style={[styles.mainActionContent, this.props.profile.profileRole === 'CARE_PROVIDER' ? styles.mainActionCareProvider: null]}>
            <View style={styles.homeTitle}>
              <Image style={styles.homeTitleIcon} resizeMode='contain' source={require('../../Assets/nurse-white.png')} />
              <Text style={[styles.mainActionText, Layout.title]}>{langProvider.views.homeSignedIn.findPartnerTitle}</Text>
            </View>
            <Text style={styles.mainActionText}>{langProvider.views.homeSignedIn.findPartnerDesc}</Text>
            <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToSearchProfile()}>
              <Text style={styles.mainActionText}>{langProvider.views.homeSignedIn.findPartnerAction}</Text>
              <Image style={styles.homeRedirectionIcon} source={caretLogoWhite} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          {
            profilesLoadedWithContract.length > 0 && 
            <View style={styles.homeViewContent}>
              <View style={styles.homeSubView}>
                <View style={styles.homeTitle}>
                  <Image style={styles.homeTitleIcon} resizeMode='contain' source={require('../../Assets/speech-bubble.png')} />
                  <Text style={[Layout.title]}>{langProvider.views.homeSignedIn.scheduleActivitiesTitle}</Text>
                </View>
                <Text>{langProvider.views.homeSignedIn.scheduleActivitiesDesc}</Text>
                <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToChatGroup()}>
                  <Text>{langProvider.views.homeSignedIn.scheduleActivitiesAction}</Text>
                  <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
                </TouchableOpacity>
              </View>
              <View style={styles.homeSubView}>
                <View style={styles.homeTitle}>
                  <Image style={styles.homeTitleIcon} resizeMode='contain' source={require('../../Assets/heart.png')} />
                  <Text style={[Layout.title]}>{langProvider.views.homeSignedIn.rateProfileTitle}</Text>
                </View>
                <Text>{langProvider.views.homeSignedIn.rateProfileDesc}</Text>
                <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToRateProfile()}>
                  <Text>{langProvider.views.homeSignedIn.rateProfileAction}</Text>
                  <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
        {
          this.props.menuOpened && 
          <Sidebar navigation={this.props.navigation}
                   profileName={this.props.profile.name}
                   profilePhotoURI={this.props.profile.pictsOnRegister.profilePhoto} />
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    menuOpened: state.homeStatus.menuOpened,
    profile: state.profile,
    profilesLoaded: state.profilesLoaded,
    token: state._userToken.token
  };
}
export default connect(mapStateToProps, null)(AuthViewCheckProvider(HomeSignedIn));
