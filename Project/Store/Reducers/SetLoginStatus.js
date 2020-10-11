import { INVALIDATE_TOKEN, SET_TOKEN } from '../Actions/UserAuth';

export function setTokenState(state, action) {
  const defaultTokenState = {
    token: '',
    refreshToken: '',
    _isValid: false
  };

  switch(action.type) {
    case INVALIDATE_TOKEN:
      return defaultTokenState;
    case SET_TOKEN:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state || defaultTokenState;
  }
}
