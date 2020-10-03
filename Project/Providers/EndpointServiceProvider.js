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

function _formatUrl(name, queryParams='', formatRulesUrl=[]) {
  const queryParamsUrl = queryParams ? `?${queryParams}`: '';
  let url = `${baseUrl}/${endpointsNames[name]}${queryParamsUrl}`;

  if (formatRulesUrl.length) {
    formatRuleUrl.forEach(format => {
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

  return fetch(url, {
    method: method,
    body: bodyData,
    headers: {...headers}
  });
}

export function requestDataEndpoint (endpointName, data, method='GET', queryParams='', formatRulesUrl=[], headers=DEFAULT_HEADERS) {
  return requestEndpoint(endpointName, data, method, queryParams, formatRulesUrl, headers)
    .then(response => response.json());
}
