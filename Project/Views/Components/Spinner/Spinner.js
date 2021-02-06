import React from 'react';
import { View, Image } from 'react-native';
import styles from './SpinnerStyles';

const loaderImg = require('../../../Assets/images/loader.gif');

export function Spinner() {
  return (
    <View style={styles.spinnerContainer}>
      <Image style={styles.spinnerImg} source={loaderImg} />
    </View>
  );
}
