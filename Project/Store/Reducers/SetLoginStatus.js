import {
  LOGIN_STATUS,
  INVALIDATE_TOKEN,
  SET_TOKEN
} from '../Actions/UserAuth';

export function setLoginStatus(state, action) {
  if (action.type === LOGIN_STATUS) {
      return {...action.payload};
  }
  return state || {
    loginError: false,
    loginMessage: ''
  };
}

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
