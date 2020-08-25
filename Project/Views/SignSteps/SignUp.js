import * as React from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';

import { resetProfileDataFromRegister } from '../../Providers/StoreUtilProvider';
import store from '../../Store/store';

import { Spinner } from '../Components/Spinner';
import SignUpViewsCarousel from './SignUpViews/SignUpViewsCarousel';
import FullLogo from '../Components/FullLogo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  subContainer: {
    flex: 1,
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
  state = {
    showSpinner: false
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', resetProfileDataFromRegister);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', resetProfileDataFromRegister);
  }

  setSpinnerShow = show => {
    this.setState({
      showSpinner: show
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.showSpinner && <Spinner />
        }
        <View style={styles.subContainer}>
          <FullLogo mode='little' stylesContainer={styles.logo} />
          <SignUpViewsCarousel displayLoadState={this.setSpinnerShow}
                               navigation={this.props.navigation}
                               style={styles.viewCarousel} />
        </View>
      </View>
    );
  }
}
