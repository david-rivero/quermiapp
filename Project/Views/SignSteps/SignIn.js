import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import FullLogo from '../Components/FullLogo';
import LoginActions from '../Components/LoginActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    opacity: 0.75
  },
  fullLogo: {
    flex: 0.25
  },
  loginActions: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed'
  }
});

export default function SignIn() {
  const image = require('../../Assets/fikri-rasyid-LeHEDlWT8zM-unsplash.jpg');

  return (
    <View style={styles.container}>
       <ImageBackground source={image} style={styles.image} resizeMode='cover'>
        <FullLogo style={styles.fullLogo}></FullLogo>
        <LoginActions style={styles.loginActions}></LoginActions>
      </ImageBackground>
    </View>
  );
}
