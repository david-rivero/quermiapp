import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

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
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonPrimary: {
    backgroundColor: '#A67547'
  },
  buttonSecoundary: {
    backgroundColor: '#DBB18A'
  }
});

export default function LoginActions(props) {
  let view = null;
  if (props.home) {
    view = (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]}
                          onPress={() => redirectToSignIn(props.navigation)}>
          <Text style={styles.buttonText}>Inicia sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSecoundary]} onPress={naiveActionClick}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    view = (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={naiveActionClick}>
          <Text style={styles.buttonText}>Inicia sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={naiveActionClick}>
          <Text style={styles.buttonLink}>¿No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return view;
}

/* Actions */
async function signIn (){
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } catch (error) {
    
  }
}

async function getCurrentUserInfo () {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    this.setState({ userInfo });
  } catch (error) {
    
  }
}

function redirectToSignIn(navigation) {
  navigation.navigate('SignIn');
}

function naiveActionClick() {
  
}
