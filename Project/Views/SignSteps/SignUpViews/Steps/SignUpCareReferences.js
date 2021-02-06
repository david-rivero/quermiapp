import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { getLocalizedTextFromLang } from '../../../../Providers/StoreUtilProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { Layout } from '../../../../Theme/Layout';
import styles from './Styles/SignUpCareReferencesStyles';

const langProvider = getLocalizedTextFromLang();

class SignUpCareReferences extends SignUpBaseStep {
  render() {
    // FIXME: Validate automatically step
    // if (!this.props.checkedStep) {
    //   this.validateStep();
    // }

    return (    
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpCareRefsTitle}</Text>
        <View style={styles.referencesForm}>
          <TextInput placeholder={langProvider.views.signUp.signUpCareRefsNameLabel} style={Layout.textInput}></TextInput>
          <TextInput placeholder={langProvider.views.signUp.signUpCareRefsPhoneLabel} style={Layout.textInput}></TextInput>
        </View>
        <Button title={langProvider.views.signUp.signUpCareRefsActionLabel} onClick={() => {}} />
      </View>
    );
  }
}
export default SignUpCareReferences;
