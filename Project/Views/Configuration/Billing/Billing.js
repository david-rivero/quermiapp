import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { concatMap } from 'rxjs/operators';

import store from '../../../Store/store';
import { SET_ACTIVE_SUBSCRIPTIONS } from '../../../Store/Actions/DetailProfile';

import { parseCurrency } from '../../../Providers/FormatStringProvider';
import { formatDatefromUnixTime } from '../../../Providers/TimeUtilsProvider';
import { requestDataEndpoint, DEFAULT_HEADERS } from '../../../Providers/EndpointServiceProvider';
import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';

import Header from '../../Components/Header/Header';
import styles from './BillingStyles';
import { Spinner } from '../../Components/Spinner/Spinner';

const caretLogo = require('../../../Assets/images/caret-right.png');
const langProvider = getLocalizedTextFromLang();

class Billing extends React.Component {
  state = {
    billOption: null,
    paymentOption: null,
    loading: false
  };

  setBillOption = billOptionId => {
    if (this.state.billOption !== billOptionId) {
      this.setState({
        billOption: billOptionId
      });
    } else {
      this.setState({
        billOption: null
      });
    }
  }

  setPaymentOption = paymentOptionId => {
    if (this.state.paymentOption !== paymentOptionId) {
      this.setState({
        paymentOption: paymentOptionId
      });
    } else {
      this.setState({
        paymentOption: null
      });
    }
  }

  confirmSubscription = () => {
    if (this.state.billOption && this.state.paymentOption) {
      const headers = {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${this.props.token}`
      };
      const checkoutData = {
        customerId: this.props.myProfile.customerPaymentId,
        profileId: this.props.myProfile.id,
        priceId: this.state.billOption,
        paymentMethodId: this.state.paymentOption
      };
      this.setState({ loading: true });
      requestDataEndpoint('customerSubscriptions', checkoutData, 'POST', '', [], headers).pipe(
        concatMap(result => {
          if (!result.error) {
            return requestDataEndpoint(
              'customerSubscriptions', undefined, 'GET',
              `profile=${this.props.myProfile.username}`, [], headers);
          }
          return of(result);
        })
      ).subscribe(data => {
        if (!data.error) {
          this.setState({
            paymentOption: null,
            billOption: null
          });
          store.dispatch({
            type: SET_ACTIVE_SUBSCRIPTIONS,
            payload: data
          });
        }
        this.setState({ loading: false });
      });
    }
  }

  cancelSubscription = () => {
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    const subscription = {
      subscriptionId: this.props.activeSubscription.id,
    };
    const rule = [
      { key: '$profile_pk', value: this.props.activeSubscription.instance_id }
    ];

    this.setState({ loading: true });

    requestDataEndpoint('customerSubscriptionsDetail', subscription, 'DELETE', '', rule, headers).pipe(
      concatMap(result => {
        if (!result.error) {
          return requestDataEndpoint(
            'customerSubscriptions', undefined, 'GET',
            `profile=${this.props.myProfile.username}`, [], headers);
        }
        return of(result);
      })
    ).subscribe(data => {
      if (!data.error) {
        store.dispatch({
          type: SET_ACTIVE_SUBSCRIPTIONS,
          payload: data
        });
      }
      this.setState({ loading: false });
    });
  }

  backToSettings = () => {
    switch(this.props.route.params.from) {
      case 'home-signed':
        this.props.navigation.navigate('HomeSignedIn');
        break;
      case 'base-configuration':
      default:
        this.props.navigation.navigate('Settings');
        break;
    }
  }

  render() {
    return (
      <View style={styles.billingView}>
        <Header></Header>
        <View>
          {
            this.props.activeSubscription.id &&
            <View>
              <View style={styles.activeSubscriptionInfo}>
                <Text style={styles.titleSection}>You have an active subscription</Text>
                <View style={styles.activeSubscriptionRowLabel}>
                  <Text style={styles.activeSubscriptionLabel}>Plan:</Text>
                  <Text>{parseCurrency(this.props.activeSubscription.currency)}{this.props.activeSubscription.price} / {this.props.activeSubscription.mode}</Text>
                </View>
                <View style={styles.activeSubscriptionRowLabel}>
                  <Text style={styles.activeSubscriptionLabel}>Status:</Text>
                  <Text>{this.props.activeSubscription.status}</Text>
                </View>
                <View style={styles.activeSubscriptionRowLabel}>
                  <Text style={styles.activeSubscriptionLabel}>Active since:</Text>
                  <Text>{formatDatefromUnixTime(this.props.activeSubscription.period_start)}</Text>
                </View>
                <View style={styles.activeSubscriptionRowLabel}>
                  <Text style={styles.activeSubscriptionLabel}>Expiration: </Text>
                  <Text>{formatDatefromUnixTime(this.props.activeSubscription.period_end)}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.cancelSubscriptionBtn}
                                onPress={this.cancelSubscription}>
                <Text style={styles.confirmSubscriptionBtnText}>Cancel subscription</Text>
              </TouchableOpacity>
            </View>
          }
          {
            !this.props.activeSubscription.id &&
            <View>
              <Text style={styles.titleSection}>Choose a plan</Text>
              <View style={styles.billingOptionsView}>
                {
                  this.props.billingOptions.map((billOption, ix) => {
                    return (
                      <TouchableOpacity style={[
                                          styles.billingOptions,
                                          billOption.subscription_id === this.state.billOption ? styles.billingOptionsSelected : null
                                        ]}
                                        onPress={_ => this.setBillOption(billOption.subscription_id)}
                                        key={`bill_option_${ix}`}>
                        <Text style={styles.billingOptionsTitle}>{billOption.name}</Text>
                        <Text>U$S{billOption.price} - {billOption.mode}</Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
              <View>
                {
                  this.props.myProfile.paymentsLinked.length ?
                  <Text style={styles.titleSection}>Choose a payment method</Text> :
                  <Text style={styles.noPaymentsLabel}>There are not payments linked. Please add one before continue</Text>
                }
                {
                  this.props.myProfile.paymentsLinked.map(payment => {
                    return <Checkbox.Item key={`payment_${payment.id}`}
                              style={styles.checkItem}
                              label={`${payment.card_type} ****${payment.last_four_digits_card}`}
                              onPress={() => { this.setPaymentOption(payment.payment_id) }}
                              status={this.state.paymentOption === payment.payment_id ? 'checked' : 'unchecked'} />
                  })
                }
              </View>
              <TouchableOpacity disabled={!this.state.billOption || !this.state.paymentOption} 
                                style={[
                                  styles.confirmSubscriptionBtn,
                                  (!this.state.billOption || !this.state.paymentOption) ? styles.confirmSubscriptionBtnDisabled : null
                                ]}
                                onPress={this.confirmSubscription}>
                <Text style={styles.confirmSubscriptionBtnText}>Confirm subscription</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        {
          this.state.loading && 
          <Spinner />
        }
        <TouchableOpacity style={styles.backActionStyle} onPress={() => this.backToSettings()}>
          <Image style={styles.backActionIcon} source={caretLogo} resizeMode='contain' />
          <Text>{langProvider.components.backButton.backLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state._userToken.token,
    billingOptions: state.subscriptionBillingOptions,
    myProfile: state.profile,
    activeSubscription: state.profile.activeSubscription
  };
}
export default connect(mapStateToProps, null)(Billing);
