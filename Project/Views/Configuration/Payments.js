import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import LanguageProvider from '../../Providers/LanguageProvider';
import { requestDataEndpoint, DEFAULT_HEADERS } from '../../Providers/EndpointServiceProvider';

import { LOAD_LINKED_PAYMENTS } from '../../Store/Actions/DetailProfile';
import store from '../../Store/store';

import { WebView } from 'react-native-webview';
import Header from '../Components/Header';
import { Spinner } from '../Components/Spinner';
import { htmlStripeForm } from './payments-utils/PaymentStripeForm';

const styles = StyleSheet.create({
  paymentsView: {
    flex: 1,
    backgroundColor: 'white'
  },
  generalPaymentSubView: {
    flex: 1
  },
  contentWebView: {
    marginTop: 10
  },
  paymentAssociatedContainer: {
    alignItems: 'center'
  },
  paymentsAssociatedTitle: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paymentsAssociatedList: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: '100%',
    paddingRight: 10
  },
  paymentsAssociatedAddBtn: {
    backgroundColor: '#32325d',
    borderRadius: 4,
    padding: 8,
    width: 175
  },
  paymentsAssociatedAddBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  backActionStyle: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  backActionIcon: {
    marginRight: 5,
    width: 10,
    transform: [{rotate: '180deg'}]
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  cardItemLogo: {
    width: 60
  },
  cardItemRemove: {
    width: 20,
    marginLeft: 'auto'
  },
  cardItemRemoveIcon: {
    width: 20
  }
});
const visaLogo = require('../../Assets/images/visa.png');
const mastercardLogo = require('../../Assets/images/mastercard_1x.png');
const removeLogo = require('../../Assets/close-cross.png');
const caretLogo = require('../../Assets/caret-right.png');

class Payments extends React.Component {
  state = {
    listCardsMode: true,
    cards: [],
    loading: false
  };

  toggleListCardsMode = value => {
    let modeValue = !this.state.listCardsMode;
    if (value && ['show', 'hide'].includes(value)) {
      modeValue = value == 'show' ? true : false;
    }

    this.setState({
      listCardsMode: modeValue
    });
  }

  loadPayments = resultData => {
    if (!resultData.error) {
      store.dispatch({
        type: LOAD_LINKED_PAYMENTS,
        payload: resultData
      })
      this.toggleListCardsMode('show');
    }
    this.setState({
      loading: false
    });
  }

  removePaymentMethod = paymentMethod => {
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    const rule = [
      { key: '$profile_pk', value: paymentMethod.id }
    ];
    const data = {
      paymentId: paymentMethod.payment_id
    };
    this.setState({
      loading: true
    });
    requestDataEndpoint(
      'paymentsRegisterDetail', data, 'DELETE', '', rule, headers).pipe(
        concatMap(result => {
          if (!result.error) {
            return requestDataEndpoint(
              'paymentsRegister', undefined, 'GET',
              `profile=${this.props.myProfile.username}`, [], headers);
          }
          return of(result);
        })
      ).subscribe(this.loadPayments);
  }

  onMessage = ev => {
    const paymentData = JSON.parse(ev.nativeEvent.data);
    const data = {
      payment_id: paymentData.paymentId,
      last_four_digits_card: paymentData.cardInfo.last4,
      exp_month: paymentData.cardInfo.exp_month,
      exp_year: paymentData.cardInfo.exp_year,
      card_type: paymentData.cardInfo.brand.toUpperCase(),
      profile: this.props.myProfile.id
    };
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    this.setState({
      loading: true
    });
    requestDataEndpoint(
      'paymentsRegister', data, 'POST', '', [], headers).pipe(
        concatMap(result => {
          if (!result.error) {
            return requestDataEndpoint(
              'paymentsRegister', undefined, 'GET',
              `profile=${this.props.myProfile.username}`, [], headers);
          }
          return of(result);
        })
      ).subscribe(this.loadPayments);
  }

  backToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.paymentsView}>
        <Header></Header>
        <View style={styles.generalPaymentSubView}>
          {
            this.state.listCardsMode &&
            <View style={[styles.generalPaymentSubView, styles.paymentAssociatedContainer]}>
              <Text style={styles.paymentsAssociatedTitle}>Associated payments</Text>
              <View style={styles.paymentsAssociatedList}>
                {
                  this.props.payments.map(card => {
                    const logo = card.card_type === 'VISA' ? visaLogo : mastercardLogo;
                    return (
                      <View style={styles.cardItem} key={`payment_item_${card.payment_id}`}>
                        <Image style={styles.cardItemLogo} source={logo} resizeMode='contain' />
                        <View>
                          <Text>{card.card_type} ****{card.last_four_digits_card}</Text>
                          <Text>Vto: {card.exp_month}/{card.exp_year}</Text>
                        </View>
                        <TouchableOpacity style={styles.cardItemRemove} onPress={_ => this.removePaymentMethod(card)}>
                          <Image style={styles.cardItemRemoveIcon} source={removeLogo} resizeMode='contain' />
                        </TouchableOpacity>
                      </View>
                    );
                  })
                }
              </View>
              <TouchableOpacity style={styles.paymentsAssociatedAddBtn} onPress={_ => this.toggleListCardsMode('hide')}>
                <Text style={styles.paymentsAssociatedAddBtnText}>Add payment mode</Text>
              </TouchableOpacity>
            </View>
          }
          {
            !this.state.listCardsMode &&
            <View style={styles.generalPaymentSubView}>
              <Text style={styles.paymentsAssociatedTitle}>Asociar tarjeta</Text>
              <WebView style={styles.contentWebView}
                       onMessage={ev => this.onMessage(ev)}
                       originWhitelist={['*']}
                       source={{ html: htmlStripeForm }}></WebView>
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
    myProfile: state.profile,
    payments: state.profile.paymentsLinked,
    language: state.language,
    token: state._userToken.token
  };
}
export default connect(mapStateToProps, null)(Payments);
