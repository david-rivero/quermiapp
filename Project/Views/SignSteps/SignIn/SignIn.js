import React from 'react';
import { connect } from 'react-redux';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { UPDATE_MY_PROFILE } from '../../../Store/Actions/DetailProfile';
import store from '../../../Store/store';
import { LOGIN } from '../../../Store/Actions/UserAuth';
import { requestDataEndpoint, AUTHENTICATION_ERROR_STATUS_CODE } from '../../../Providers/EndpointServiceProvider';
import { ProfileSerializer } from '../../../Providers/SerializerProvider';
import { isValidEmail } from '../../../Providers/FormatStringProvider';
import { setToken } from '../../../Providers/AuthUtilProvider';
import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';

import { Layout } from '../../../Theme/Layout';
import styles from './SignInStyles';
import FullLogo from '../../Components/FullLogo/FullLogo';

const langProvider = getLocalizedTextFromLang();

class SignIn extends React.Component {
  state = {
    loginError: false,
    loginMessage: ''
  };

  componentDidMount() {
    this.props.navigation.addListener('blur', () => {
      store.dispatch({
        type: LOGIN,
        payload: {
          email: '',
          password: ''
        }
      });
      this.setState({
        loginError: false,
        loginMessage: ''
      });
    });
  }

  getRequestObservable = requestInstance => {
    return requestInstance.pipe(
      concatMap(data => {
        if (!data.error) {
          setToken(data.access, data.refresh);
          const useremail = `user__email=${this.props.email}`;
          return requestDataEndpoint('profile', undefined, 'GET', useremail);
        }
        return of(data);
      })
    );
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

  performLogin() {
    if (isValidEmail(this.props.email)) {
      const data = {
        email: this.props.email.trim(),
        password: this.props.password
      };
      this.setState({ loginError: false, loginMessage: '' });
      this.getRequestObservable(requestDataEndpoint('login', data, 'POST'))
        .subscribe(profileData => {
          if (!profileData.error) {
            store.dispatch({
              type: UPDATE_MY_PROFILE,
              payload: ProfileSerializer.fromAPIToView(profileData.pop())
            });
            this.setState({ loginError: false, loginMessage: '' });
            this.props.navigation.navigate('HomeSignedIn');
          } else {
            if (profileData.status === AUTHENTICATION_ERROR_STATUS_CODE) {
              this.setState({
                loginError: true, loginMessage: 'Username or password are not valid'
              });
            } else {
              this.setState({
                loginError: true, loginMessage: 'There was an unexpected error'
              });
            }
          }
        });
    } else {
      this.setState({
        loginError: true,
        loginMessage: 'You must to provide a valid email'
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FullLogo mode='medium' stylesContainer={styles.fullLogo}
                    displayLabel={true} logoTitle={langProvider.components.fullLogo.logoTitle}></FullLogo>
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
            this.state.loginError &&
            <Text>{this.state.loginMessage}</Text>
          }
          <View style={styles.loginActions}>
            <TouchableOpacity style={[styles.button, styles.buttonPrimary]}
                              onPress={() => this.performLogin()}>
              <Text style={styles.buttonText}>{langProvider.components.loginActions.signIn}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLinkContainer}
                              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.buttonLink}>{langProvider.components.loginActions.registerFirstTime}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    email: state.profile.account.email,
    password: state.profile.account.password
  };
}
export default connect(mapStateToProps, null)(SignIn);
