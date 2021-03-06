import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { withInAppNotification } from 'react-native-in-app-notification';

import { formatDate } from '../../../Providers/TimeUtilsProvider';
import { requestEndpoint, requestDataEndpoint, DEFAULT_HEADERS } from '../../../Providers/EndpointServiceProvider';
import LanguageProvider from '../../../Providers/LanguageProvider';
import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import styles from './ActionsStyles';

const loveIcon = require('../../../Assets/images/heart-pink.png');
const contactIcon = require('../../../Assets/images/social-orange.png');
const rateIcon = require('../../../Assets/images/star-border.png');
const acceptIcon = require('../../../Assets/images/checked.png');

export function ProfileActionsWrapper (ViewWrapper) {
  return withInAppNotification(class extends React.Component {
    _generateNotification = (typeNotification) => {
      const langProvider = getLocalizedTextFromLang();
      const title = `${typeNotification}Title`;
      const message = `${typeNotification}Message`;

      this.props.showNotification({
        title: langProvider.components.actions[title],
        message: langProvider.components.actions[message],
        vibrate: false
      });
    }

    loveProfile = profile => {
      const currentLoveStatus = profile.profileStatus.loveProfile || 0;
      const data = {
        profile_status: {
          ...profile.profileStatus,
          love_profile: currentLoveStatus + 1
        }
      }
      const rules = [
        { key: '$profile_id', value: profile.id }
      ];
      const headers = {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${this.props.token}`
      };
      requestDataEndpoint('profileDetail', data, 'PATCH', '', rules, headers)
        .subscribe(resp => {
          if (!resp.error) {
            this._generateNotification('actionLikeNotif');
          }
        });
    }

    sendContactRequest = (profile, myProfile) => {
      const [patientId, carePersonId] = profile.profileRole === 'PATIENT' ?
        [profile.id, myProfile.id] : [myProfile.id, profile.id];
      const formattedDate = `${formatDate(new Date(), 'api')}Z`;
      const data = {
        start_date: formattedDate,
        end_date: formattedDate,
        status: 'CPEN',
        patient: patientId,
        care_person: carePersonId
      };
      const headers = {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${this.props.token}`
      };

      requestEndpoint('contractsCreate', data, 'POST', '', [], headers)
        .pipe(catchError(e => of({...e})))
        .subscribe(resp => {
          if (!resp.error) {
            this.props.navigation.navigate('HomeSignedIn');
            this._generateNotification('actionSendReqNotif');
          }
        });
    }

    rateProfile = profile => {
      this.props.navigation.navigate('RateProfile', { profile: profile });
    }

    acceptRequest = contractId => {
      const data = {
        status: 'CADD'
      };
      const headers = {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${this.props.token}`
      };
      const rules = [
        {key: '$contract_id', value: contractId},
      ];

      requestEndpoint('contractsDetail', data, 'PATCH', '', rules, headers)
        .pipe(catchError(e => of({...e})))
        .subscribe(resp => {
          if (!resp.error) {
            this.props.navigation.navigate('HomeSignedIn');
            this._generateNotification('actionAcceptReqNotif');
          }
        });
    }

    render() {
      return <ViewWrapper {...this.props}
                          rateProfile={this.rateProfile}
                          sendContactRequest={this.sendContactRequest}
                          loveProfile={this.loveProfile}
                          acceptRequest={this.acceptRequest} />
    }
  });
}

export function ProfileActions (props) {
  return (
    <View style={[styles.actionsContainer, props.actionsStyles]}>
      <TouchableOpacity style={[styles.actionItem, styles.actionItemLeft, props.isDetail && styles.actionDetail]}
                        onPress={_ => props.loveProfile()}>
        <Image resizeMode='cover' source={loveIcon} style={styles.actionIcon} />
      </TouchableOpacity>
      {
        !props.profile.contractWithCurrentProfile &&
        <TouchableOpacity style={[styles.actionItem, styles.actionItemCenter, props.isDetail && styles.actionDetail]}
                          onPress={_ => props.sendContactRequest()}>
          <Image resizeMode='cover' source={contactIcon} style={styles.actionIconCenter} />
        </TouchableOpacity>
      }
      {
        props.profile.contractWithCurrentProfile &&
        ['CADD', 'CACT'].find(i => i === props.profile.contractWithCurrentProfile.type) &&
        <TouchableOpacity style={[styles.actionItem, styles.actionItemRight, props.isDetail && styles.actionDetail]}
                          onPress={_ => props.rateProfile()}>
          <Image resizeMode='cover' source={rateIcon} style={styles.actionIcon} />
        </TouchableOpacity>
      }
      {
        props.profile.contractWithCurrentProfile &&
        props.profile.contractWithCurrentProfile.type === 'CPEN' &&
        <TouchableOpacity style={[styles.actionItem, styles.actionItemRight, props.isDetail && styles.actionDetail]}
                          onPress={_ => props.acceptRequest()}>
          <Image resizeMode='cover' source={acceptIcon} style={styles.actionIcon} />
        </TouchableOpacity>
      }
    </View>
  );
}
