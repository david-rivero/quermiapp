import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LOAD_LIST_LANGUAGES } from '../../Store/Actions/DetailProfile';
import { LOAD_SERVICES_API } from '../../Store/Actions/UserAuth';
import store from '../../Store/store';
import ServiceEndpointProvider from '../../Providers/EndpointServiceProvider';


import FullLogo from '../Components/FullLogo';
import LoginActions from '../Components/LoginActions';
import LanguageSelector from '../Components/LanguageSelector';

import { Layout } from '../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12
  },
  fullLogo: {
    flex: 0.5
  },
  loginActions: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed'
  },
  contentTop: {
    marginTop: 'auto'
  }
});

export default class HomeGuest extends React.Component {
  constructor(props) {
    super(props);
    ServiceEndpointProvider.registerEndpoint('nameLang', 'GET');
    ServiceEndpointProvider.registerEndpoint('nameServices', 'GET');
    ServiceEndpointProvider.registerEndpoint('profile', 'GET');
  }
  
  componentDidMount() {
    ServiceEndpointProvider.endpoints.nameLang.get()
      .then(r => r.json())
      .then(data => {
        store.dispatch({
          type: LOAD_LIST_LANGUAGES,
          payload: data
        });
      });
    ServiceEndpointProvider.endpoints.nameServices.get()
      .then(r => r.json())
      .then(data => {
        store.dispatch({
          type: LOAD_SERVICES_API,
          payload: data
        });
      });
  }

  render() {
    const isHome = true;
  
    return (
      <View style={[Layout.container, styles.container]}>
        <LanguageSelector />
        <View style={[{flex: 1}, styles.contentTop]}>
          <FullLogo stylesContainer={styles.fullLogo} mode='medium' displayLabel={true}></FullLogo>
        </View>
        <View style={styles.contentTop}>
          <LoginActions home={isHome} navigation={this.props.navigation} style={styles.loginActions}></LoginActions>
        </View>
      </View>
    );
  }
}
