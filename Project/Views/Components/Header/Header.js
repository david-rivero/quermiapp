import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from './HeaderStyles';

const logoSrc = require('../../../Assets/nurse-white.png');
const menuIcon = require('../../../Assets/images/burger-menu.png');

export default function Header (props) {
  return (
    <View style={[styles.header, props.isCarePerson ? styles.headerCareProvider : null]}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={logoSrc} resizeMode='contain' />
      </View>
      <TouchableOpacity style={styles.menuIconLink}
                        onPress={() => props.onOpenMenu && props.onOpenMenu()}>
        <Image style={styles.menuIcon} source={menuIcon} resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
}
