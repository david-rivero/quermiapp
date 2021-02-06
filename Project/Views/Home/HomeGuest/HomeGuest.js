import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { LOAD_LIST_LANGUAGES } from '../../../Store/Actions/DetailProfile';
import { LOAD_SERVICES_API } from '../../../Store/Actions/Categories';
import store from '../../../Store/store';

import { requestDataEndpoint } from '../../../Providers/EndpointServiceProvider';
import { getLocalizedTextFromLang } from '../../../Providers/StoreUtilProvider';

import FullLogo from '../../Components/FullLogo/FullLogo';
import LanguageSelector from '../../Components/LanguageSelector/LanguageSelector';
import styles from './HomeGuestStyles';

import { Layout } from '../../../Theme/Layout';

const langProvider = getLocalizedTextFromLang();

class HomeGuest extends React.Component {
  componentDidMount() {
    requestDataEndpoint('nameLang', undefined, 'GET')
      .subscribe(data => {
        if (!data.error) {
          store.dispatch({
            type: LOAD_LIST_LANGUAGES,
            payload: data
          });
        }
      });
    requestDataEndpoint('nameServices', undefined, 'GET')
      .subscribe(data => {
        if (!data.error) {
          store.dispatch({
            type: LOAD_SERVICES_API,
            payload: data
          });
        }
      });
  }

  render() {
    return (
      <View style={[Layout.container, styles.container]}>
        <LanguageSelector language={this.props.language} />
        <View style={[{flex: 1}, styles.contentTop]}>
          <FullLogo stylesContainer={styles.fullLogo}
                    mode='medium' displayLabel={true}
                    logoTitle={langProvider.components.fullLogo.logoTitle}></FullLogo>
        </View>
        <View style={styles.contentTop}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]}
                            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>{langProvider.components.loginActions.signIn}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]}
                            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>{langProvider.components.loginActions.register}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default HomeGuest;

