import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { RadioButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: '25%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  radioBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#424242',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    paddingVertical: 12,
    marginBottom: 10
  },
  radioText: {
    flex: 1
  }
});
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
