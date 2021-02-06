import { StyleSheet } from 'react-native';

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

export default styles;
