import React from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import Header from '../../Components/Header/Header';
import styles from './BaseConfigurationStyles';

const paymentsLogo = require('../../../Assets/images/credit-card.png');
const configLogo = require('../../../Assets/images/settings.png');

class BaseConfiguration extends React.Component {
  backToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  goPayments = () => {
    this.props.navigation.navigate('Payments', { from: 'base-configuration' });
  }

  goBilling = () => {
    this.props.navigation.navigate('Billing', { from: 'base-configuration' });
  }

  render() {
    return (
      <View>
        <Header></Header>
        <View style={styles.settingsTitleSection}>
          <Image style={styles.settingsTitleIcon} source={configLogo} />
          <Text style={styles.settingsTitleText}>Configuración</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.goPayments()}>
            <Image style={styles.homeRedirectionIcon} source={paymentsLogo} resizeMode='contain' />
            <Text>Payments</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.goBilling()}>
            <Image style={styles.homeRedirectionIcon} source={paymentsLogo} resizeMode='contain' />
            <Text>Billing</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.backToHome()}>
          <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
          <Text>{langProvider.components.backButton.backLabel}</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state._userToken.token,
    myProfile: state.profile
  };
}
export default connect(mapStateToProps, null)(BaseConfiguration);
