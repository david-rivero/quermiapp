import dev from '../../env/local.json';

const endpointsNames = {
  login: 'api/login',
  user: 'api/user',
  profile: 'api/profile',
  nameLang: 'api/name/languages/',
  nameServices: 'api/name/services/',
  apiTokenRefresh: 'api/token/refresh/'
};

export default class ServiceEndpointProvider {
  static endpoints = {};
  static defaultHeaders = {
    'Content-Type': 'application/json'
  }

  static registerEndpoint (name, method='GET') {
    ServiceEndpointProvider.endpoints[name] = function (data, headers=ServiceEndpointProvider.defaultHeaders) {
      const url = `${dev.serverUrl}/${endpointsNames[name]}`;
      return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };
  }
}
