import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  billingView: {
    flex: 1,
    backgroundColor: 'white'
  },
  billingOptionsView: {
    flexDirection: 'row',
    marginTop: 10,
    height: '50%'
  },
  billingOptions: {
    backgroundColor: '#E4A5F2',
    flex: 1,
    marginHorizontal: 5,
    padding: 10
  },
  billingOptionsSelected: {
    backgroundColor: '#A297C3'
  },
  billingOptionsTitle: {
    fontWeight: 'bold'
  },
  confirmSubscriptionBtn: {
    backgroundColor: '#596F4F',
    borderRadius: 4,
    marginHorizontal: 5,
    padding: 10
  },
  cancelSubscriptionBtn: {
    backgroundColor: '#98434F',
    borderRadius: 4,
    marginHorizontal: 5,
    padding: 10
  },
  confirmSubscriptionBtnDisabled: {
    backgroundColor: '#585858',
    opacity: 0.75
  },
  confirmSubscriptionBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleSection: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  noPaymentsLabel: {
    margin: 10
  },
  activeSubscriptionInfo: {
    margin: 10
  },
  activeSubscriptionLabel: {
    fontWeight: 'bold',
    marginRight: 5
  },
  activeSubscriptionRowLabel: {
    flexDirection: 'row'
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
  }
});

export default styles;
