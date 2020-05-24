import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { FullLogo } from '../Components/FullLogo';
import { LoginActions } from '../Components/LoginActions';

const styles = StyleSheet.create({
  container: {
    backgroundImage: 'url(assets/fikri-rasyid-LeHEDlWT8zM-unsplash.jpg)',
    backgroundRepeat: 'no-repeat'
  }
});

export default function HomeGuest() {
  const isHome = true;

  return (
    <View style={styles.container}>
      <FullLogo></FullLogo>
      <LoginActions home={isHome}></LoginActions>
    </View>
  );
}
