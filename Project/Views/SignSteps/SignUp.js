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
  viewCarousel: {
    flex: 2
  }
});

export default class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FullLogo mode='little' styles={styles.logo} />
        <SignUpViewsCarousel navigation={this.props.navigation} style={styles.viewCarousel} />
      </View>
    );
  }
}
