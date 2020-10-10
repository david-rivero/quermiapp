import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const loaderImg = require('../../Assets/images/loader.gif');
const styles = StyleSheet.create({
  spinnerContainer: {
    backgroundColor: '#b1b1b1',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  }
});

export function Spinner() {
  return (
    <View style={styles.spinnerContainer}>
      <Image style={styles.spinnerImg} source={loaderImg} />
    </View>
  );
}
