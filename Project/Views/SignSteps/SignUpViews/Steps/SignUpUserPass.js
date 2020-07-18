import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import store from '../../../../Store/store';
import LanguageProvider from '../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});

class SignUpUserPass extends SignUpBaseStep {
  // Remove component state
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
      <View style={Layout.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpUserPassTitle}</Text>
        <View style={styles.container}>
          <TextInput placeholder={langProvider.views.signIn.emailPlaceholder} style={Layout.textInput}></TextInput>
          <TextInput placeholder={langProvider.views.signIn.passwordPlaceholder} secureTextEntry={true} style={Layout.textInput}></TextInput>
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpUserPass);
