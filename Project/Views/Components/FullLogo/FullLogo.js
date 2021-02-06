import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './FullLogoStyles';

const uriLogo = require('../../../Assets/images/quermi-full-logo.png');

export default function FullLogo (props) {
  const mode = props.mode || 'medium';
  const imgStyles = [
    styles.image,
    mode === 'little' && styles.figureLittle,
    mode === 'medium' && styles.figureMedium,
    mode === 'big'    && styles.figureBig
  ];

  return (
    <View style={[styles.logo, props.stylesContainer]}>
      <View style={styles.figure}>
        <Image source={uriLogo} resizeMode='contain' style={imgStyles}></Image>
      </View>
      {
        props.displayLabel && <Text style={styles.text}>{props.logoTitle}</Text>
      }
    </View>
  );
}
