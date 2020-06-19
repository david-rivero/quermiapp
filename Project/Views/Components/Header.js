import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { Colors } from '../../Theme/Colors';

const styles = StyleSheet.create({
  header: {
    height: 75,
    width: '100%',
    backgroundColor: Colors.pink,
    alignItems: 'center'
  },
  imgContainer: {
    marginTop: -12,
    width: 32
  },
  img: {
    width: '100%'
  }
});

export default function Header () {
  const logoSrc = require('../../Assets/nurse-white.png');
  return (
    <View style={styles.header}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={logoSrc} resizeMode='contain' />
      </View>
    </View>
  );
}
