import ConfigProvider from './ConfigProvider';

const endpointsNames = {
  login: 'api/login',
  user: 'api/user',
  profile: 'api/profile',
  nameLang: 'api/name/languages/',
  nameServices: 'api/name/services/',
  apiTokenRefresh: 'api/token/refresh/'
};

const baseUrl = ConfigProvider().serverUrl;

export default class ServiceEndpointProvider {
  static endpoints = {};
  static defaultHeaders = {
    'Content-Type': 'application/json'
  }

  static registerEndpoint (name, method='GET') {
    ServiceEndpointProvider.endpoints[name] = function (data, headers=ServiceEndpointProvider.defaultHeaders) {
      const url = `${baseUrl}/${endpointsNames[name]}`;
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
