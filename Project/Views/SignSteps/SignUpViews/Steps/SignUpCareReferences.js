import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import store from '../../../../Store/store';
import LanguageProvider from '../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  referencesForm: {
    marginBottom: 30
  }
});

class SignUpCareReferences extends SignUpBaseStep {
  // Remove state component
  state = {
    ...this.getInitialStepState()
  };

  render() {
    const langProvider = LanguageProvider(store.getState().language);

    // FIXME: Validate automatically step
    if (!this.state.checkedStep) {
      this.validateStep();
    }

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
