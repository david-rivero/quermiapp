import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import store from '../../Store/store';
import LanguageProvider from '../Providers/LanguageProvider';

import { Layout } from '../../Theme/Layout';
import FullLogo from '../Components/FullLogo';
import LoginActions from '../Components/LoginActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12
  },
  fullLogo: {
    flex: 0.5
  },
  loginActions: {
    marginTop: 60
  }
});

function SignIn({ navigation }) {
  const langProvider = LanguageProvider(store.getState().language);
  return (
    <View style={styles.container}>
      <FullLogo mode='medium' stylesContainer={styles.fullLogo} displayLabel={true}></FullLogo>
      <View>
        <TextInput placeholder={langProvider.views.signIn.emailPlaceholder} style={Layout.textInput}></TextInput>
        <TextInput placeholder={langProvider.views.signIn.passwordPlaceholder} secureTextEntry={true} style={Layout.textInput}></TextInput>
      </View>
      <View style={styles.loginActions}>
        <LoginActions navigation={navigation}></LoginActions>
      </View>
    </View>
  );
}
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignIn);
