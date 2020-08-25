import { SIGN_UP_STEP, LOGIN_STATUS } from '../Store/Actions/UserAuth';
import { UPDATE_MY_PROFILE } from '../Store/Actions/DetailProfile';
import { defaultProfile } from '../Store/Reducers/SetDetailProfile';
import store from '../Store/store';

export function resetProfileDataFromRegister() {
  store.dispatch({
    type: SIGN_UP_STEP,
    payload: {
      indexActive: 0,
      nextStep: false
    }
  });
  store.dispatch({
    type: UPDATE_MY_PROFILE,
    payload: {...defaultProfile}
  });
}


export function resetProfileDataFromLogin() {
  store.dispatch({
    type: LOGIN_STATUS,
    payload: {
      loginError: false,
      loginMessage: ''
    }
  });
  store.dispatch({
    type: UPDATE_MY_PROFILE,
    payload: {...defaultProfile}
  });
}
