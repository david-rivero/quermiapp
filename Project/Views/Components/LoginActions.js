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

  redirectToSignIn(navigation) {
    navigation.navigate('SignIn');
  }

  redirectToSignUp(navigation) {
    navigation.navigate('SignUp');
  }

  naiveActionClick() {
    
  }

  render() {
    let view = null;
    if (this.props.home) {
      view = (
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]}
                            onPress={() => this.redirectToSignIn(this.props.navigation)}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecoundary]} onPress={() => this.redirectToSignUp(this.props.navigation)}>
            <Text style={styles.buttonText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      view = (
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={this.naiveActionClick}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.redirectToSignUp(this.props.navigation)}>
            <Text style={styles.buttonLink}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return view;
  }
}