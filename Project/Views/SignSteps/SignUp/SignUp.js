import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';

import { Spinner } from '../../Components/Spinner/Spinner';
import styles from './SignUpStyles';
import SignUpViewsCarousel from '../SignUpViews/SignUpViewsCarousel';
import FullLogo from '../../Components/FullLogo/FullLogo';

const langProvider = getLocalizedTextFromLang();

class SignUp extends React.Component {
  state = {
    showSpinner: false
  };

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
          <FullLogo mode='little' stylesContainer={styles.logo}
                    logoTitle={langProvider.components.fullLogo.logoTitle} />
          <SignUpViewsCarousel displayLoadState={this.setSpinnerShow}
                               navigation={this.props.navigation}
                               style={styles.viewCarousel} />
        </View>
      </View>
    );
  }
}
// FIXME: Remove connect definition on child components
export default SignUp;
