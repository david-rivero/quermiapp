import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import FullLogo from '../Components/FullLogo';
import LoginActions from '../Components/LoginActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12
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

export default function SignIn({ navigation }) {
  const image = require('../../Assets/fikri-rasyid-LeHEDlWT8zM-unsplash.jpg');

  return (
    <View style={styles.container}>
      <FullLogo mode='medium' style={styles.fullLogo} displayLabel={true}></FullLogo>
      <LoginActions style={styles.loginActions} navigation={navigation}></LoginActions>
    </View>
  );
}
