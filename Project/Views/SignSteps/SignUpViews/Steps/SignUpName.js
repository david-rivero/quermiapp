import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpNameStyles';
import { Layout } from '../../../../Theme/Layout';


class SignUpName extends SignUpBaseStep {
  changeText = text => {
    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'name',
        profileData: text
      }
    });
    if (text.length) {
      this.validateStep();
    } else {
      this.uncheckStep();
    }
  };

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpNameTitle}</Text>
        <TextInput placeholder={langProvider.views.signUp.signUpNamePlaceholder}
                   onChangeText={this.changeText}
                   style={Layout.textInput} />
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpName);
