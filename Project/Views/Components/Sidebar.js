import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { LOG_OUT, INVALIDATE_TOKEN } from '../../Store/Actions/UserAuth';
import { TOGGLE_MENU_OPEN } from '../../Store/Actions/DetailProfile';
import store from '../../Store/store';
import LanguageProvider from '../../Providers/LanguageProvider';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: '100%',
    width: 200,
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginBottom: 12
  },
  profileText: {
    marginBottom: 15,
    color: 'black'
  },
  menuLink: {
    marginVertical: 5,
    height: 40,
    width: '100%'
  },
  menuLinkText: {
    fontSize: 18
  }
});

class Sidebar extends React.Component {
  goSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  logout = () => {
    store.dispatch({
      type: INVALIDATE_TOKEN
    });
    store.dispatch({
      type: LOG_OUT
    });
    store.dispatch({
      type: TOGGLE_MENU_OPEN,
      payload: false
    });
    this.props.navigation.navigate('SignIn');
  }

  render() {
    const profilePhoto = this.props.profilePhotoURI;
    const langProvider = LanguageProvider(this.props.language);

    return (
      <View style={styles.view}>
        <View>
          <Image source={{uri: profilePhoto}} resize='cover' style={styles.profilePhoto} />
          <Text style={styles.profileText}>{langProvider.components.sidebar.greeting} {this.props.profileName}</Text>
        </View>
        <TouchableOpacity onPress={() => this.logout()} style={styles.menuLink}>
          <Text style={styles.menuLinkText}>{langProvider.components.sidebar.logoutLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.language
  }
}
export default connect(mapStateToProps, null)(Sidebar);
