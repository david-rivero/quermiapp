import ConfigProvider from './ConfigProvider';

const endpointsNames = {
  login: 'api/login',
  user: 'api/users',
  profile: 'api/profiles/',
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
    if (!ServiceEndpointProvider.endpoints[name]) {
      ServiceEndpointProvider.endpoints[name] = {};
    }
    ServiceEndpointProvider.endpoints[name][method.toLowerCase()] = function (data, queryParams='', headers=ServiceEndpointProvider.defaultHeaders) {
      let bodyData = data;
      if (headers['Content-Type'] === 'application/json') {
        bodyData = JSON.stringify(data);
      }
      const queryParamsUrl = queryParams ? `?${queryParams}`: '';
      const url = `${baseUrl}/${endpointsNames[name]}${queryParamsUrl}`;
      return fetch(url, {
        method: method,
        body: bodyData,
        headers: {...headers}
      });
    };
  }
}
