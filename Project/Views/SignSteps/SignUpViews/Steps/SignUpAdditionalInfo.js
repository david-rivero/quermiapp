import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';

const styles = StyleSheet.create({
  containerView: {
    flex: 1
  },
  textProfileTitle: {
    marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  checkboxAdditional: {
    marginLeft: -15,
    width: '95%'
  },
  checkLabel: {
    color: 'black'
  }
});

class SignUpAdditionalInfo extends SignUpBaseStep {
  toggleCheck = field => {
    const state = store.getState();
    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'profileStatus',
        profileData: {
          ...state.profile.profileStatus,
          [field]: !this.props[field]
        }
      }
    });
  }

  componentDidUpdate(prevPs) {
    if (prevPs.autonomousProfessionalCheck || prevPs.covidTestCheck) {
      if (this.props.autonomousProfessionalCheck && this.props.covidTestCheck) {
        this.validateStep();
      } else {
        this.uncheckStep();
      }
    }
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);

    return (
      <View style={styles.containerView}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpAdditionalInfoTitle}</Text>
        <View>
          <Checkbox.Item style={styles.checkboxAdditional}
                         label={langProvider.views.signUp.autonomousProfessionalLabel}
                         onPress={() => { this.toggleCheck('autonomousProfessionalCheck') }}
                         status={this.props.autonomousProfessionalCheck ? 'checked' : 'unchecked'}
                         labelStyle={styles.checkLabel} />
          <Checkbox.Item style={styles.checkboxAdditional}
                         label={langProvider.views.signUp.covidCheckLabel}
                         onPress={() => { this.toggleCheck('covidTestCheck') }}
                         status={this.props.covidTestCheck ? 'checked' : 'unchecked'}
                         labelStyle={styles.checkLabel} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language,
    autonomousProfessionalCheck: state.profile.profileStatus.autonomousProfessionalCheck,
    covidTestCheck: state.profile.profileStatus.covidTestCheck
  }
}
export default connect(mapStateToProps, null)(SignUpAdditionalInfo);
