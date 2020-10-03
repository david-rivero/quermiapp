import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, BackHandler } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import store from '../../Store/store';
import { LOGIN, LOGIN_STATUS } from '../../Store/Actions/UserAuth';
import LanguageProvider from '../../Providers/LanguageProvider';

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

class SignIn extends React.Component {
  componentDidMount() {
    this.props.navigation.addListener('blur', () => {
      store.dispatch({
        type: LOGIN,
        payload: {
          email: '',
          password: ''
        }
      });
      store.dispatch({
        type: LOGIN_STATUS,
        payload: {
          loginError: false,
          loginMessage: ''
        }
      });
    });
  }

  setLoginErrorStatus = (status, message) => {
    store.dispatch({
      type: LOGIN_STATUS,
      payload: {
        loginError: status,
        loginMessage: message
      }
    });
  }

  setLoginInputCredentials = ({email, password}) => {
    store.dispatch({
      type: LOGIN,
      payload: {
        email: email,
        password: password
      }
    });
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <FullLogo mode='medium' stylesContainer={styles.fullLogo} displayLabel={true}></FullLogo>
        <View>
          <TextInput value={this.props.email}
                     onChangeText={text => this.setLoginInputCredentials({email: text, password: this.props.password})}
                     placeholder={langProvider.views.signIn.emailPlaceholder}
                     style={Layout.textInput}></TextInput>
          <TextInput value={this.props.password}
                     onChangeText={text => this.setLoginInputCredentials({email: this.props.email, password: text})}
                     placeholder={langProvider.views.signIn.passwordPlaceholder}
                     secureTextEntry={true}
                     style={Layout.textInput}></TextInput>
        </View>
        {
          this.props.loginError &&
          <Text>{this.props.loginMessage}</Text>
        }
        <View style={styles.loginActions}>
          <LoginActions email={this.props.email}
                        password={this.props.password}
                        onLoginErrorStatus={this.setLoginErrorStatus}
                        navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    loginError: state.loginStatus.loginError,
    loginMessage: state.loginStatus.loginMessage,
    email: state.profile.account.email,
    password: state.profile.account.password
  };
}
export default connect(mapStateToProps, null)(SignIn);
