import * as React from 'react';

import {
  AUTHENTICATION_ERROR_STATUS_CODE,
  CLIENT_ERROR_STATUS_CODE
} from '../../Providers/EndpointServiceProvider';
import { verifyIsValidToken } from '../../Providers/AuthUtilProvider';
import store from '../../Store/store'

export function AuthViewCheckProvider (WrappedClass) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.props.navigation.addListener('focus', () => {
        verifyIsValidToken(store.getState()._userToken.token)
          .subscribe(r => {
            if (r.status === AUTHENTICATION_ERROR_STATUS_CODE ||
                r.status === CLIENT_ERROR_STATUS_CODE) {
              this.props.navigation.navigate('SignIn');
            }
          });
      });
    }

    render() {
      return <WrappedClass {...this.props} />;
    }
  };
}

