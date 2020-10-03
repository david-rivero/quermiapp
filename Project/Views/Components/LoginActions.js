import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../Theme/Colors';
import { isValidEmail } from '../../Providers/FormatStringProvider';
import LanguageProvider from '../../Providers/LanguageProvider';
import { requestEndpoint, requestDataEndpoint } from '../../Providers/EndpointServiceProvider';
import { ProfileSerializer } from '../../Providers/SerializerProvider';
import store from '../../Store/store';
import { UPDATE_MY_PROFILE } from '../../Store/Actions/DetailProfile';


const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    height: 35,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  buttonLink: {
    color: '#7370FA',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 15
  },
  buttonLinkContainer: {
    marginTop: 15
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonPrimary: {
    backgroundColor: Colors.blue,
    color: Colors.white
  },
  buttonSecoundary: {
    backgroundColor: Colors.white,
    color: Colors.black
  }
});

class LoginActions extends React.Component {
  constructor(props) {
    super(props);
  }

  performLogin() {
    if (isValidEmail(this.props.email)) {
      const data = {
        email: this.props.email.trim(),
        password: this.props.password
      };
      this.props.onLoginErrorStatus(false, '');
      requestEndpoint('login', data, 'POST')
        .then(r => {
          if (r.status === 200) {
            const useremail = `user__email=${this.props.email}`;
            requestDataEndpoint('profile', undefined, 'GET', useremail)
              .then(profileData => {
                store.dispatch({
                  type: UPDATE_MY_PROFILE,
                  payload: ProfileSerializer.fromAPIToView(profileData.pop())
                });
                this.redirectToHomeSigned();
              });
          } else {
            this.props.onLoginErrorStatus(true, 'Username or password are not valid');
          }
        })
        .catch(e => {
          this.props.onLoginErrorStatus(true, 'There was an unexpected error');
          console.error(e);
        });
    } else {
      this.props.onLoginErrorStatus(true, 'You must to provide a valid email');
    }
  }

  redirectToSignIn() {
    this.props.navigation.navigate('SignIn');
  }

  redirectToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  redirectToHomeSigned() {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    let view = null;
    const langProvider = LanguageProvider(this.props.language);

    if (this.props.home) {
      view = (
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]}
                            onPress={() => this.redirectToSignIn()}>
            <Text style={styles.buttonText}>{langProvider.components.loginActions.signIn}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecoundary]} onPress={() => this.redirectToSignUp()}>
            <Text style={styles.buttonText}>{langProvider.components.loginActions.register}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      view = (
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => this.performLogin()}>
            <Text style={styles.buttonText}>{langProvider.components.loginActions.signIn}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLinkContainer} onPress={() => this.redirectToSignUp()}>
            <Text style={styles.buttonLink}>{langProvider.components.loginActions.registerFirstTime}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return view;
  }
}
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(LoginActions);
