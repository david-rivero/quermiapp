import { throwError, pipe, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, concatMap } from 'rxjs/operators';

import ConfigProvider from './ConfigProvider';

const baseUrl = ConfigProvider().serverUrl;
const endpointsNames = {
  login: 'api/login',
  user: 'api/users',
  profile: 'api/profiles/',
  profileDetail: 'api/profiles/profile/$profile_id/',
  contracts: 'api/contracts',
  contractsCreate: 'api/contracts/create',
  nameLang: 'api/name/languages/',
  nameServices: 'api/name/services/',
  apiTokenRefresh: 'api/token/refresh/',
  chatRoom: 'api/chatroom/$from_profile/$to_profile/',
  reports: 'api/reports'
};
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};
export const ERROR_STATUS_CODE = 400;
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

  return fromFetch(url, {
    method: method,
    body: bodyData,
    headers: {...headers}
  }).pipe(
    map(r => {
      if (r.status >= ERROR_STATUS_CODE) {
        throwError({ status: r.status, message: r.message });
      }
      return r;
    }),
    catchError(e => of({ error: true, message: e.message }))
  );
}

export function requestDataEndpoint (endpointName, data, method='GET', queryParams='', formatRulesUrl=[], headers=DEFAULT_HEADERS) {
  return requestEndpoint(endpointName, data, method, queryParams, formatRulesUrl, headers)
    .pipe(concatMap(r => r.json()));
}
