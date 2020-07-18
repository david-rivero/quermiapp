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
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '25%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});

class SignUpName extends SignUpBaseStep {
  // Remove component state
  state = {
    ...this.getInitialStepState()
  };

  changeText = text => {
    if (text.length) {
      this.validateStep();
    }
  };

  render() {
    const langProvider = LanguageProvider(store.getState().language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpNameTitle}</Text>
        <TextInput placeholder={langProvider.views.signUp.signUpNamePlaceholder} onChangeText={this.changeText} style={Layout.textInput}></TextInput>
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
