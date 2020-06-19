import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import SignUpViewsCarousel from './SignUpViews/SignUpViewsCarousel';
import FullLogo from '../Components/FullLogo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    padding: 10
  },
  logo: {
    flex: 0.25
  },
  viewCarousel: {
    flex: 2
  }
});

export default class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FullLogo mode='little' stylesContainer={styles.logo} />
        <SignUpViewsCarousel navigation={this.props.navigation} style={styles.viewCarousel} />
      </View>
    );
  }
}