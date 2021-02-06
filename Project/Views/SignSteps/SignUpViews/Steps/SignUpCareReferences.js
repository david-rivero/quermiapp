import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TextInput } from 'react-native';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { Layout } from '../../../../Theme/Layout';
import styles from './Styles/SignUpCareReferencesStyles';


class SignUpCareReferences extends SignUpBaseStep {
  render() {
    const langProvider = LanguageProvider(this.props.language);

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
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpCareReferences);
