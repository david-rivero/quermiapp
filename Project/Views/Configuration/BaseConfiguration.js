import React from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import store from '../../Store/store';

import { requestDataEndpoint, DEFAULT_HEADERS } from '../../Providers/EndpointServiceProvider';
import { SET_ACTIVE_SUBSCRIPTIONS } from '../../Store/Actions/DetailProfile';
import { SET_PAYMENT_OPTIONS } from '../../Store/Actions/Payments';

import Header from '../Components/Header';

const styles = StyleSheet.create({
  settingsTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  settingsTitleIcon: {
    height: 48,
    width: 48
  },
  settingsTitleText: {
    fontSize: 18
  },
  homeRedirectAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  homeRedirectionIcon: {
    height: 40,
    width: 40,
    marginRight: 15
  }
});
const paymentsLogo = require('../../Assets/images/credit-card.png');
const configLogo = require('../../Assets/images/settings.png');

class BaseConfiguration extends React.Component {
  componentDidMount() {
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    requestDataEndpoint('subscriptionPrices', undefined, 'GET', '', [], headers)
      .subscribe(data => {
        store.dispatch({
          type: SET_PAYMENT_OPTIONS,
          payload: data
        });
      });

    requestDataEndpoint(
      'customerSubscriptions', undefined, 'GET', `profile=${this.props.myProfile.username}`, [], headers)
      .subscribe(data => {
        store.dispatch({
          type: SET_ACTIVE_SUBSCRIPTIONS,
          payload: data
        });
      });
  }

  backToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  goPayments = () => {
    this.props.navigation.navigate('Payments');
  }

  goBilling = () => {
    this.props.navigation.navigate('Billing');
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
