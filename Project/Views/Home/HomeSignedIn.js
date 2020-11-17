import React from 'react';
import { connect } from 'react-redux';
import { forkJoin } from 'rxjs';
import { View, Text, Image, TouchableOpacity, BackHandler, StyleSheet } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';

import { Layout } from '../../Theme/Layout';
import { Colors } from '../../Theme/Colors';

import { LOG_OUT_PROFILE, INVALIDATE_TOKEN } from '../../Store/Actions/UserAuth';
import { LOAD_PROFILES_TO_SEARCH } from '../../Store/Actions/ProfilesToSearch';
import { TOGGLE_MENU_OPEN } from '../../Store/Actions/DetailProfile';

import LanguageProvider from '../../Providers/LanguageProvider';
import { mapContractsToProfiles } from '../../Providers/StoreUtilProvider';
import { ProfileSerializer } from '../../Providers/SerializerProvider';
import { requestDataEndpoint, DEFAULT_HEADERS } from '../../Providers/EndpointServiceProvider';
import store from '../../Store/store';

import { AuthViewCheckProvider } from '../Components/AuthViewCheck';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const caretLogoWhite = require('../../Assets/caret-right-white.png');
const caretLogo = require('../../Assets/caret-right.png');
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
  _getContracts = () => {
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
    forkJoin({
      contracts: requestDataEndpoint(
        'contracts', undefined, 'GET', `${queryFieldToContract}=${this.props.profile.username}`, [], headers),
      profiles: requestDataEndpoint('profile', undefined, 'GET', `role=${profileRoleToSearch}`)
    }).subscribe(result => {
      if (!result.contracts.error && !result.profiles.error) {
        const profilesLoaded = mapContractsToProfiles(
          this.props.profile.profileRole, result.contracts, result.profiles);
        store.dispatch({
          type: LOAD_PROFILES_TO_SEARCH,
          payload: profilesLoaded.map(profile => ProfileSerializer.fromAPIToView(profile))
        });
      }
    });
  }

  fakeBackPress = () => {
    return true;
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', e => {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress', this.fakeBackPress);
      // TODO: Replace this call to use only from SearchProfiles focus
      this._getContracts();
    });
    this.props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress', this.fakeBackPress);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.fakeBackPress);
  }

  logout = () => {
    store.dispatch({
      type: INVALIDATE_TOKEN
    });
    // FIXME: Are LOG_OUT or LOG_OUT_PROFILE used?
    store.dispatch({
      type: LOG_OUT_PROFILE
    });
    store.dispatch({
      type: TOGGLE_MENU_OPEN,
      payload: false
    });
    this.props.navigation.navigate('SignIn');
  }

  openMenu = () => {
    store.dispatch({
      type: TOGGLE_MENU_OPEN,
      payload: !this.props.menuOpened
    });
  }

  componentDidUpdate(prevProps) {
    const langProvider = LanguageProvider(this.props.language);
    const roleRequested = this.props.profile.profileRole === 'PATIENT' ? 'CARE_PROVIDER' : 'PATIENT' 
    const pendingProfiles = this.props.profilesLoaded.filter(
      profile => {
        return profile.contractWithCurrentProfile &&
               profile.contractWithCurrentProfile.type === 'CPEN' &&
               profile.profileRole === roleRequested;
      });

    if (pendingProfiles.length && !prevProps.profilesLoaded.length) {
      this.props.showNotification({
        title: langProvider.views.homeSignedIn.pendingRequestsTitle,
        message: langProvider.views.homeSignedIn.pendingRequestsMessage,
        vibrate: false
      });
    }
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const textConfig = {
      greeting: langProvider.components.sidebar.greeting,
      logoutLabel: langProvider.components.sidebar.logoutLabel
    };
    const profilesLoadedWithContract = this.props.profilesLoaded.filter(
      profile => profile.contractWithCurrentProfile && ['CADD', 'CACT'].find(i => i === profile.contractWithCurrentProfile.type));

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
            <TouchableOpacity style={styles.homeRedirectAction}
                              onPress={() => this.props.navigation.navigate('SearchProfile')}>
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
                <TouchableOpacity style={styles.homeRedirectAction}
                                  onPress={() => this.props.navigation.navigate('ChatList')}>
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
                <TouchableOpacity style={styles.homeRedirectAction}
                                  onPress={() => this.props.navigation.navigate('RateProfileList')}>
                  <Text>{langProvider.views.homeSignedIn.rateProfileAction}</Text>
                  <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
        {
          this.props.menuOpened && 
          <Sidebar profileName={this.props.profile.name}
                   profilePhotoURI={this.props.profile.pictsOnRegister.profilePhoto}
                   logoutAction={this.logout}
                   textConfig={textConfig} />
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
export default connect(mapStateToProps, null)(
  withInAppNotification(AuthViewCheckProvider(HomeSignedIn)));
