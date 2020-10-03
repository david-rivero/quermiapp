import ConfigProvider from './ConfigProvider';

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

const baseUrl = ConfigProvider().serverUrl;

export default class ServiceEndpointProvider {
  static endpoints = {};
  static defaultHeaders = {
    'Content-Type': 'application/json'
  }

  static registerEndpoint (name, method='GET') {
    if (!ServiceEndpointProvider.endpoints[name]) {
      ServiceEndpointProvider.endpoints[name] = {};
    }
    ServiceEndpointProvider.endpoints[name][method.toLowerCase()] = function (data, queryParams='', formatUrl=[], headers=ServiceEndpointProvider.defaultHeaders) {
      let bodyData = data;
      if (headers['Content-Type'] === 'application/json') {
        bodyData = JSON.stringify(data);
      }
      const queryParamsUrl = queryParams ? `?${queryParams}`: '';
      let url = `${baseUrl}/${endpointsNames[name]}${queryParamsUrl}`;
      if (formatUrl.length) {
        formatUrl.forEach(format => {
          url = url.replace(format.key, format.value);
        });
      } else if (url.indexOf('$') !== -1) {
        url = url.substr(0, url.indexOf('$'))
      }

      return fetch(url, {
        method: method,
        body: bodyData,
        headers: {...headers}
      });
    };
  }
}
