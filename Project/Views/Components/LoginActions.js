import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../Theme/Colors';
import LanguageProvider from '../../Providers/LanguageProvider';
import ServiceEndpointProvider from '../../Providers/EndpointServiceProvider';


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
    textDecorationLine: 'underline'
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonPrimary: {
    backgroundColor: Colors.pink,
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
    ServiceEndpointProvider.registerEndpoint('login', 'POST');
  }

  performLogin() {
    const data = {
      username: this.props.username,
      password: this.props.password
    };
    this.props.onLoginErrorStatus(false, '');
    ServiceEndpointProvider.endpoints.login(data)
      .then(r => {
        if (r.status === 200) {
          this.redirectToHomeSigned();
        } else {
          this.props.onLoginErrorStatus(true, 'Username or password are not valid');
        }
      })
      .catch(e => {
        this.props.onLoginErrorStatus(true, 'There was an unexpected error');
        console.error(e);
      });
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
          <TouchableOpacity onPress={() => this.redirectToSignUp()}>
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
