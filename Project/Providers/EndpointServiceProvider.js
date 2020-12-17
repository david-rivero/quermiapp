import { throwError, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, concatMap } from 'rxjs/operators';

import ConfigProvider from './ConfigProvider';

const baseUrl = ConfigProvider().serverUrl;
const endpointsNames = {
  login: 'api/login',
  verifyToken: 'api/token/verify/',
  user: 'api/users',
  profile: 'api/profiles/',
  profileDetail: 'api/profiles/profile/$profile_id/',
  contracts: 'api/contracts',
  contractsCreate: 'api/contracts/create',
  contractsDetail: 'api/contracts/$contract_id/',
  nameLang: 'api/name/languages/',
  nameServices: 'api/name/services/',
  apiTokenRefresh: 'api/token/refresh/',
  chatRoom: 'api/chatroom/$from_profile/$to_profile/',
  reports: 'api/reports',
  paymentsRegister: 'api/payments/payment-register',
  paymentsRegisterDetail: 'api/payments/payment-register/$profile_pk/',
  customerSubscriptions: 'api/payments/customer-subscriptions',
  customerSubscriptionsDetail: 'api/payments/customer-subscriptions/$profile_pk/',
  subscriptionPrices: 'api/payments/subscription-prices'
};
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};
export const CLIENT_ERROR_STATUS_CODE = 400;
export const AUTHENTICATION_ERROR_STATUS_CODE = 401;

function _formatUrl(name, queryParams='', formatRulesUrl=[]) {
  const queryParamsUrl = queryParams ? `?${queryParams}`: '';
  let url = `${baseUrl}/${endpointsNames[name]}${queryParamsUrl}`;

  if (formatRulesUrl.length) {
    formatRulesUrl.forEach(format => {
      url = url.replace(format.key, format.value);
    });
  } else if (url.indexOf('$') !== -1) {
    url = url.substr(0, url.indexOf('$'))
  }

  return url;
}

export function requestEndpoint (endpointName, data, method='GET', queryParams='', formatRulesUrl=[], headers=DEFAULT_HEADERS) {
  const url = _formatUrl(endpointName, queryParams, formatRulesUrl);
  let bodyData = data;
  if (headers['Content-Type'] === 'application/json') {
    bodyData = JSON.stringify(data);
  }

  // TODO: All catchError should return of({}) on items --> Improve error handling
  return fromFetch(url, {
    method: method,
    body: bodyData,
    headers: {...headers}
  }).pipe(
    concatMap(r => {
      if (r.status >= CLIENT_ERROR_STATUS_CODE) {
        return throwError({
          error: true, status: r.status, message: r.statusText
        });
      }
      return of(r);
    })
  );
}

export function requestDataEndpoint (endpointName, data, method='GET', queryParams='', formatRulesUrl=[], headers=DEFAULT_HEADERS) {
  return requestEndpoint(endpointName, data, method, queryParams, formatRulesUrl, headers)
    .pipe(
      concatMap(r => r.json()),
      catchError(e => of(e))
    );
}
