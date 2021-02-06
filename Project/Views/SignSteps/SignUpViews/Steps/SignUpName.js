import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import { getLocalizedTextFromLang } from '../../../../Providers/StoreUtilProvider';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpNameStyles';
import { Layout } from '../../../../Theme/Layout';

const langProvider = getLocalizedTextFromLang();

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
export default SignUpName;
