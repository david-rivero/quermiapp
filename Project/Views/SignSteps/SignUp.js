import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import SignUpViewsCarousel from './SignUpViews/SignUpViewsCarousel';
import FullLogo from '../Components/FullLogo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start'
  },
  fullLogo: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-start'
  },
  viewCarousel: {
    flex: 2
  }
});

export default class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FullLogo mode='little' style={styles.fullLogo} />
        <SignUpViewsCarousel style={styles.viewCarousel} />
      </View>
    );
  }
}
