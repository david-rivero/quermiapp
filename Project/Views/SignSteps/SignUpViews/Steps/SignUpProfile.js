import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import store from '../../../../Store/store';
import LanguageProvider from '../../../Providers/LanguageProvider';

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

class SignUpProfile extends SignUpBaseStep {
  // Remove component state
  state = {
    ...this.getInitialStepState(),
    itemsOptions: [
      {
        label: 'signUpProfilePatientOption',
        value: 'PATIENT'
      },
      {
        label: 'signUpProfileCarePersonOption',
        value: 'CARE_PROVIDER'
      }
    ],
    profileValue: null
  };

  setProfileStatus = value => {
    this.setState({
      profileValue: value
    });
    this.validateStep();
    this.props.onChangeProfileValue(value);
  }

  render() {
    const langProvider = LanguageProvider(store.getState().language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpProfileTitle}</Text>
        <RadioButton.Group onValueChange={profileValue => this.setProfileStatus(profileValue)}
                           value={this.state.profileValue}>
          {
            this.state.itemsOptions.map((item, index) => {
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
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpProfile);
