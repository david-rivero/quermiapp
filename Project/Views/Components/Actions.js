import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withInAppNotification } from 'react-native-in-app-notification';
import { formatDate } from '../../Providers/TimeUtilsProvider';
import { requestEndpoint, requestDataEndpoint, DEFAULT_HEADERS } from '../../Providers/EndpointServiceProvider';
import LanguageProvider from '../../Providers/LanguageProvider';

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionItem: {
    borderRadius: 1000,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: 'black',
    shadowOpacity: 1.0
  },
  actionItemLeft: {
    marginRight: 12.5
  },
  actionItemCenter:{
    marginRight: 12.5,
    marginLeft: 12.5
  },
  actionItemRight: {
    marginLeft: 12.5
  },
  actionIcon: {
    height: 40,
    width: 40
  },
  actionIconCenter: {
    height: 50,
    width: 50
  },
  actionDetail: {
    backgroundColor: '#fafafa'
  }
});

class Actions extends React.Component {
  sendContactRequest = () => {
    const langProvider = LanguageProvider(this.props.language);

    const patientId = this.props.profile.profileRole === 'PATIENT' ? 
      this.props.profile.id : this.props.myProfile.id;
    const carePersonId = this.props.profile.profileRole === 'CARE_PROVIDER' ? 
      this.props.profile.id : this.props.myProfile.id;

    const formattedDate = formatDate(new Date(), 'api');
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
    // FIXME: Contracts creation is not working properly
    requestEndpoint('contractsCreate', data, 'POST', '', [], headers)
      .subscribe(_ => {
        this.props.navigation.navigate('HomeSignedIn');
        this.props.showNotification({
          title: langProvider.components.actions.actionSendReqNotifTitle,
          message: langProvider.components.actions.actionSendReqNotifMessage,
          vibrate: false
        });
      });
  }

  loveProfile = () => {
    const langProvider = LanguageProvider(this.props.language);
    const currentLoveStatus = this.props.profile.profileStatus.loveProfile || 0;
    const data = {
      profile_status: {
        ...this.props.profile.profileStatus,
        love_profile: currentLoveStatus + 1
      }
    }
    const rules = [
      { key: '$profile_id', value: this.props.profile.id }
    ];
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    requestDataEndpoint('profileDetail', data, 'PATCH', '', rules, headers)
      .subscribe(_ => {
        this.props.showNotification({
          title: langProvider.components.actions.actionLikeNotifTitle,
          message: langProvider.components.actions.actionLikeNotifMessage,
          vibrate: false
        });
      });
  }

  goRateProfile = () => {
    this.props.navigation.navigate('RateProfile', { profile: this.props.profile });
  }

  render() {
    const loveIcon = require('../../Assets/images/heart-pink.png');
    const contactIcon = require('../../Assets/images/social-orange.png');
    const rateIcon = require('../../Assets/images/star-border.png');

    return (
      <View style={[styles.actionsContainer, this.props.actionsStyles]}>
        <TouchableOpacity style={[styles.actionItem, styles.actionItemLeft, this.props.isDetail && styles.actionDetail]}
                          onPress={this.loveProfile}>
          <Image resizeMode='cover' source={loveIcon} style={styles.actionIcon} />
        </TouchableOpacity>
        {
          !this.props.profile.contractWithCurrentProfile &&
          <TouchableOpacity style={[styles.actionItem, styles.actionItemCenter, this.props.isDetail && styles.actionDetail]}
                            onPress={this.sendContactRequest}>
            <Image resizeMode='cover' source={contactIcon} style={styles.actionIconCenter} />
          </TouchableOpacity>
        }
        {
          this.props.profile.contractWithCurrentProfile &&
          <TouchableOpacity style={[styles.actionItem, styles.actionItemRight, this.props.isDetail && styles.actionDetail]}
                            onPress={this.goRateProfile}>
            <Image resizeMode='cover' source={rateIcon} style={styles.actionIcon} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.language,
    myProfile: state.profile,
    token: state._userToken.token
  };
}
export default connect(mapStateToProps, null)(withInAppNotification(Actions));
