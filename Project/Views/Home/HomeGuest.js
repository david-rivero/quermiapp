import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import FullLogo from '../Components/FullLogo';
import LoginActions from '../Components/LoginActions';

import { Layout } from '../../Theme/Layout';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    opacity: 0.75
  },
  fullLogo: {
    flex: 1
  },
  loginActions: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed'
  }
});

export default function HomeGuest({ navigation }) {
  const isHome = true;
  const image = require('../../Assets/fikri-rasyid-LeHEDlWT8zM-unsplash.jpg');

  return (
    <View style={Layout.container}>
       <ImageBackground source={image} style={styles.image} resizeMode='cover'>
        <FullLogo style={styles.fullLogo} mode='medium' displayLabel={true}></FullLogo>
        <LoginActions home={isHome} navigation={navigation} style={styles.loginActions}></LoginActions>
      </ImageBackground>
    </View>
  );
}
