import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { LOAD_LIST_LANGUAGES } from '../../Store/Actions/DetailProfile';
import { LOAD_SERVICES_API } from '../../Store/Actions/Categories';
import store from '../../Store/store';

import LanguageProvider from '../../Providers/LanguageProvider';
import { requestDataEndpoint } from '../../Providers/EndpointServiceProvider';

import FullLogo from '../Components/FullLogo';
import LanguageSelector from '../Components/LanguageSelector';

import { Colors } from '../../Theme/Colors';
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
  },
  button: {
    borderRadius: 2,
    height: 35,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonPrimary: {
    backgroundColor: Colors.blue,
    color: Colors.white
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    color: Colors.black
  }
});

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
    const langProvider = LanguageProvider(this.props.language);
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
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(HomeGuest);

