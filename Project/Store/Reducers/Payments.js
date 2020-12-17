import { SET_PAYMENT_OPTIONS } from '../Actions/Payments';

export function setBilling(state, action) {
  if (action.type === SET_PAYMENT_OPTIONS) {
    return [...action.payload];
  }
  return state || [];
}
