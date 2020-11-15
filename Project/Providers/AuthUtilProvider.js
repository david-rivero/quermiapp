import {
  requestEndpoint,
  AUTHENTICATION_ERROR_STATUS_CODE,
  CLIENT_ERROR_STATUS_CODE
} from './EndpointServiceProvider';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SET_TOKEN, INVALIDATE_TOKEN } from '../Store/Actions/UserAuth';
import store from '../Store/store';

export function verifyIsValidToken(token) {
  const data = { token: token };
  return requestEndpoint('verifyToken', data, 'POST')
    .pipe(
      catchError(e => {
        if (e.status === AUTHENTICATION_ERROR_STATUS_CODE ||
          e.status === CLIENT_ERROR_STATUS_CODE) {
          store.dispatch({
            type: INVALIDATE_TOKEN
          });
        }
        return of({...e});
      })
    );
}

export function setToken(token, refresh) {
  store.dispatch({
    type: SET_TOKEN,
    payload: {
      token: token,
      refreshToken: refresh,
      _isValid: true
    }
  });
}
