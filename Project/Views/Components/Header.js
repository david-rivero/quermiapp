import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../Theme/Colors';

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  headerCareProvider: {
    backgroundColor: Colors.pink
  },
  imgContainer: {
    width: 32
  },
  menuIconLink: {
    height: 24,
    width: 24,
    position: 'absolute',
    right: 10,
    top: 20,
    zIndex: 10
  },
  menuIcon: {
    height: '100%',
    width: '100%'
  },
  img: {
    width: '100%'
  }
});

export default class Header extends React.Component {
  openMenu = () => {
    if(this.props.onOpenMenu) {
      this.props.onOpenMenu();
    }
  }

  render() {
    const logoSrc = require('../../Assets/nurse-white.png');
    const menuIcon = require('../../Assets/images/burger-menu.png');
    return (
      <View style={[styles.header, this.props.isCarePerson ? styles.headerCareProvider : null]}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={logoSrc} resizeMode='contain' />
        </View>
        <TouchableOpacity style={styles.menuIconLink} onPress={() => this.openMenu()}>
          <Image style={styles.menuIcon} source={menuIcon} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
}
