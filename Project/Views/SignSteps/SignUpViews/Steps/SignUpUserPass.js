import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

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
  setUserPass = (field, value) => {
    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'account',
        profileData: {
          email: field === 'email' ? value : this.props.email,
          password: field === 'password' ? value : this.props.password
        }
      }
    })
    if (this.props.email && this.props.password) {
      this.validateStep();
    } else {
      this.uncheckStep();
    }
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={Layout.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpUserPassTitle}</Text>
        <View style={styles.container}>
          <TextInput onChangeText={text => this.setUserPass('email', text)}
                     placeholder={langProvider.views.signIn.emailPlaceholder}
                     style={Layout.textInput} />
          <TextInput onChangeText={text => this.setUserPass('password', text)}
                     placeholder={langProvider.views.signIn.passwordPlaceholder}
                     secureTextEntry={true}
                     style={Layout.textInput} />
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    email: state.profile.account.email,
    password: state.profile.account.password
  };
}
export default connect(mapStateToProps, null)(SignUpUserPass);
