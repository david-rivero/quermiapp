import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';

import { LOG_OUT } from '../../Store/Actions/UserAuth';
import store from '../../Store/store';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: '100%',
    width: 200,
    backgroundColor: 'white',
    padding: 20
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginBottom: 12
  },
  profileText: {
    marginBottom: 15
  },
  menuLink: {
    marginVertical: 5,
    height: 40
  },
  menuLinkText: {
    fontSize: 18
  }
});

export default class Sidebar extends React.Component {
  goSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  logout = () => {
    store.dispatch({
      type: LOG_OUT
    });
    this.props.navigation.navigate('SignIn');
  }

  render() {
    const profilePhoto = this.props.profilePhotoURI;
    return (
      <View style={styles.view}>
        <View>
          <Image source={{uri: profilePhoto}} resize='cover' style={styles.profilePhoto} />
          <Text style={styles.profileText}>Hola {this.props.profileName}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => this.goSettings()} style={styles.menuLink}>
          <Text style={styles.menuLinkText}>Settings</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => this.logout()} style={styles.menuLink}>
          <Text style={styles.menuLinkText}>Logout</Text>
        </TouchableOpacity> */}
        <Button title='Logout' onPress={() => this.logout()}>
        </Button>
      </View>
    );
  }
} 
