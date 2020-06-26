import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../Theme/Colors';

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

export default class LoginActions extends React.Component {
  constructor(props) {
    super(props);
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
    if (this.props.home) {
      view = (
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]}
                            onPress={() => this.redirectToSignIn()}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecoundary]} onPress={() => this.redirectToSignUp()}>
            <Text style={styles.buttonText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      view = (
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => this.redirectToHomeSigned()}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.redirectToSignUp()}>
            <Text style={styles.buttonLink}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return view;
  }
}
