import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpProfileStyles';
import { RadioButton } from 'react-native-paper';


const itemsOptions = [
  {
    label: 'signUpProfilePatientOption',
    value: 'PATIENT'
  },
  {
    label: 'signUpProfileCarePersonOption',
    value: 'CARE_PROVIDER'
  }
];

class SignUpProfile extends SignUpBaseStep {
  setProfileStatus = value => {
    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'profileRole',
        profileData: value
      }
    });
    this.props.updateParentRoleState(value);
    this.validateStep();
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpProfileTitle}</Text>
        <RadioButton.Group onValueChange={profileValue => this.setProfileStatus(profileValue)}
                           value={this.props.profileValue}>
          {
            itemsOptions.map((item, index) => {
              return (
                <View key={index} style={styles.radioBtnContainer}>
                  <Text style={styles.radioText}>{langProvider.views.signUp[item.label]}</Text>
                  <RadioButton value={item.value} />
                </View>
              );
            })
          }
        </RadioButton.Group>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    profileValue: state.profile.profileRole
  };
}
export default connect(mapStateToProps, null)(SignUpProfile);
