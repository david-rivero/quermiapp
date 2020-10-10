import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import LanguageProvider from '../../Providers/LanguageProvider';

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
    const langProvider = LanguageProvider(this.props.language);
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
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
// FIXME: Remove connect definition on child components
export default connect(mapStateToProps, null)(SignUp);
