import React from 'react';
import { connect } from 'react-redux';
import { forkJoin } from 'rxjs';
import { View, Text, Image, TouchableOpacity, BackHandler } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';

import { Layout } from '../../../Theme/Layout';

import { LOG_OUT_PROFILE, INVALIDATE_TOKEN } from '../../../Store/Actions/UserAuth';
import { LOAD_PROFILES_TO_SEARCH } from '../../../Store/Actions/ProfilesToSearch';
import { TOGGLE_MENU_OPEN, LOAD_LINKED_PAYMENTS, SET_ACTIVE_SUBSCRIPTIONS } from '../../../Store/Actions/DetailProfile';
import { SET_PAYMENT_OPTIONS } from '../../../Store/Actions/Payments';

import LanguageProvider from '../../../Providers/LanguageProvider';
import { mapContractsToProfiles } from '../../../Providers/StoreUtilProvider';
import { ProfileSerializer } from '../../../Providers/SerializerProvider';
import { requestDataEndpoint, DEFAULT_HEADERS } from '../../../Providers/EndpointServiceProvider';
import store from '../../../Store/store';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/Header';
import styles from './HomeSignedInStyles';

const caretLogoWhite = require('../../../Assets/images/caret-right-white.png');
const caretLogo = require('../../../Assets/images/caret-right.png');
const nurseWhite = require('../../../Assets/images/nurse-white.png');
const speechBubble = require('../../../Assets/images/speech-bubble.png');
const heartLogo = require('../../../Assets/images/heart.png');
const paymentsLogo = require('../../../Assets/images/credit-card.png');
const paymentsLogoWhite = require('../../../Assets/images/credit-card-white.png');
const docIdLogo = require('../../../Assets/images/id-card-white.png');


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
          payload: profilesLoaded.filter(prof => prof.verified_profile)
            .map(profile => ProfileSerializer.fromAPIToView(profile))
        });
      }
    });
  }

  _retrieveSubscriptionInfo = () => {
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    requestDataEndpoint('subscriptionPrices', undefined, 'GET', '', [], headers)
      .subscribe(data => {
        store.dispatch({
          type: SET_PAYMENT_OPTIONS,
          payload: data
        });
      });

    requestDataEndpoint(
      'customerSubscriptions', undefined, 'GET', `profile=${this.props.profile.username}`, [], headers)
      .subscribe(data => {
        store.dispatch({
          type: SET_ACTIVE_SUBSCRIPTIONS,
          payload: data
        });
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
      this._retrieveSubscriptionInfo();
    });
    this.props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress', this.fakeBackPress);
      store.dispatch({
        type: TOGGLE_MENU_OPEN,
        payload: false
      });
    });

    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    requestDataEndpoint(
      'paymentsRegister', undefined, 'GET',
      `profile=${this.props.profile.username}`, [], headers).subscribe(data => {
        if (!data.error) {
          store.dispatch({
            type: LOAD_LINKED_PAYMENTS,
            payload: data
          });
        }
      })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.fakeBackPress);
  }

  logout = () => {
    store.dispatch({
      type: INVALIDATE_TOKEN
    });
    store.dispatch({
      type: LOG_OUT_PROFILE
    });
    store.dispatch({
      type: TOGGLE_MENU_OPEN,
      payload: false
    });
    this.props.navigation.navigate('SignIn');
  }

  navSettings = () => {
    this.props.navigation.navigate('Settings');
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
      logoutLabel: langProvider.components.sidebar.logoutLabel,
      navSettingsLabel: langProvider.components.sidebar.navSettingsLabel
    };
    const profilesLoadedWithContract = this.props.profilesLoaded.filter(
      profile => profile.contractWithCurrentProfile && ['CADD', 'CACT'].find(i => i === profile.contractWithCurrentProfile.type));
    
    const objModelInfo = {
      logo: null,
      title: '',
      desc: '',
      actionFn: () => {},
      actionText: '',
      actionLogo: null 
    };
    const dataRows = [];

    const PROFILE_IS_VERIFIED = (
      this.props.profile.pictsOnRegister.documentID && this.props.profile.verifiedProfile);
    const PROFILE_DOC_SET_NO_VERIFIED = (
      this.props.profile.pictsOnRegister.documentID && !this.props.profile.verifiedProfile);
    const PROFILE_HAS_LINKED_PAYMENTS = this.props.profile.paymentsLinked.length;
    const PROFILE_HAS_ACTIVE_SUBSCRIPTION = this.props.profile.activeSubscription.id;
    const PROFILE_HAS_ACTIVE_CONTRACTS = profilesLoadedWithContract.length;

    if (PROFILE_IS_VERIFIED && PROFILE_HAS_LINKED_PAYMENTS && PROFILE_HAS_ACTIVE_SUBSCRIPTION) {
      dataRows.push({
        ...objModelInfo,
        logo: nurseWhite,
        title: langProvider.views.homeSignedIn.findPartnerTitle,
        desc: langProvider.views.homeSignedIn.findPartnerDesc,
        actionFn: () => { this.props.navigation.navigate('SearchProfile'); },
        actionText: langProvider.views.homeSignedIn.findPartnerAction,
        actionLogo: caretLogoWhite
      });

      if (PROFILE_HAS_ACTIVE_CONTRACTS) {
        dataRows.push({
          ...objModelInfo,
          logo: speechBubble,
          title: langProvider.views.homeSignedIn.scheduleActivitiesTitle,
          desc: langProvider.views.homeSignedIn.scheduleActivitiesDesc,
          actionFn: () => { this.props.navigation.navigate('ChatList'); },
          actionText: langProvider.views.homeSignedIn.scheduleActivitiesAction,
          actionLogo: caretLogo
        });
        dataRows.push({
          ...objModelInfo,
          logo: heartLogo,
          title: langProvider.views.homeSignedIn.rateProfileTitle,
          desc: langProvider.views.homeSignedIn.rateProfileDesc,
          actionFn: () => { this.props.navigation.navigate('RateProfileList') },
          actionText: langProvider.views.homeSignedIn.rateProfileAction,
          actionLogo: caretLogo
        })
      }
    } else {
      if (!PROFILE_IS_VERIFIED && !PROFILE_DOC_SET_NO_VERIFIED) {
        dataRows.push({
          ...objModelInfo,
          logo: docIdLogo,
          title: langProvider.views.homeSignedIn.validateIdTitle,
          desc: langProvider.views.homeSignedIn.validateIdDesc,
          actionFn: () => { this.props.navigation.navigate('ValidateProfile'); },
          actionText: langProvider.views.homeSignedIn.validateIdAction,
          actionLogo: caretLogoWhite
        });
      }
      if (PROFILE_DOC_SET_NO_VERIFIED) {
        dataRows.push({
          ...objModelInfo,
          logo: docIdLogo,
          title: langProvider.views.homeSignedIn.validationInProcessTitle,
          desc: langProvider.views.homeSignedIn.validationInProcessDesc,
          actionFn: () => { this.props.navigation.navigate('ValidateProfile'); },
          actionText: langProvider.views.homeSignedIn.validationInProcessAction,
          actionLogo: caretLogoWhite
        });
      }
      if (!PROFILE_HAS_LINKED_PAYMENTS) {
        dataRows.push({
          ...objModelInfo,
          logo: dataRows.length ? paymentsLogo : paymentsLogoWhite,
          title: langProvider.views.homeSignedIn.addPayMethodTitle,
          desc: langProvider.views.homeSignedIn.addPayMethodDesc,
          actionFn: () => { this.props.navigation.navigate('Payments', { from: 'home-signed' }); },
          actionText: langProvider.views.homeSignedIn.addPayMethodAction,
          actionLogo: dataRows.length ? caretLogo : caretLogoWhite
        });
      }
      if (!PROFILE_HAS_ACTIVE_SUBSCRIPTION) {
        dataRows.push({
          ...objModelInfo,
          logo: dataRows.length ? paymentsLogo : paymentsLogoWhite,
          title: langProvider.views.homeSignedIn.activateSubscriptionTitle,
          desc: langProvider.views.homeSignedIn.activateSubscriptionDesc,
          actionFn: () => { this.props.navigation.navigate('Billing', { from: 'home-signed' }); },
          actionText: langProvider.views.homeSignedIn.activateSubscriptionAction,
          actionLogo: dataRows.length ? caretLogo : caretLogoWhite
        });
      }
    }

    return (
      <View style={[styles.superContainer]}>
        <View style={[Layout.container, styles.container, this.props.menuOpened ? styles.containerMenuOpen : null]}>
          <Header onOpenMenu={this.openMenu} isCarePerson={this.props.profile.profileRole === 'CARE_PROVIDER'} />
          <View style={[styles.mainActionContent, this.props.profile.profileRole === 'CARE_PROVIDER' ? styles.mainActionCareProvider: null]}>
            <View style={styles.homeTitle}>
              <Image style={styles.homeTitleIcon} resizeMode='contain' source={dataRows[0].logo} />
              <Text style={[styles.mainActionText, Layout.title]}>{dataRows[0].title}</Text>
            </View>
            <Text style={styles.mainActionText}>{dataRows[0].desc}</Text>
            <TouchableOpacity style={styles.homeRedirectAction}
                              onPress={dataRows[0].actionFn}>
              <Text style={styles.mainActionText}>{dataRows[0].actionText}</Text>
              <Image style={styles.homeRedirectionIcon} source={dataRows[0].actionLogo} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={styles.homeViewContent}>
            {
              dataRows.slice(1, dataRows.length).map((dataRow, index) => {
                return (
                  <View style={styles.homeSubView} key={`home_sub_${index}`}>
                    <View style={styles.homeTitle}>
                      <Image style={styles.homeTitleIcon} resizeMode='contain' source={dataRow.logo} />
                      <Text style={[Layout.title]}>{dataRow.title}</Text>
                    </View>
                    <Text>{dataRow.desc}</Text>
                    <TouchableOpacity style={styles.homeRedirectAction}
                                      onPress={dataRow.actionFn}>
                      <Text>{dataRow.actionText}</Text>
                      <Image style={styles.homeRedirectionIcon} source={dataRow.actionLogo} resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </View>
        </View>
        {
          this.props.menuOpened && 
          <Sidebar profileName={this.props.profile.name}
                   profilePhotoURI={this.props.profile.pictsOnRegister.profilePhoto}
                   logoutAction={this.logout}
                   navSettingsAction={this.navSettings}
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
