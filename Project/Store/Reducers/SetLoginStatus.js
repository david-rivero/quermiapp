import { LOGIN_STATUS } from '../Actions/UserAuth';

export function setLoginStatus(state, action) {
  if (action.type === LOGIN_STATUS) {
      return {...action.payload};
  }
  return state || {
    loginError: false,
    loginMessage: ''
  };
}
