import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Layout } from '../../Theme/Layout';

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  figure: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  figureBig: {
    width: 250
  },
  figureMedium: {
    width: 180
  },
  figureLittle: {
    width: 120
  },
  image: {
    flex: 1
  },
  text: {
    marginTop: 20,
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  }
});


export default function FullLogo(props) {
  const mode = props.mode || 'medium';
  const imgStyles = [
    styles.image,
    mode === 'little' && styles.figureLittle,
    mode === 'medium' && styles.figureMedium,
    mode === 'big'    && styles.figureBig
  ];
  const uriLogo = require('../../Assets/careme-full-logo.png');

  return (
    <View style={[styles.logo, props.stylesContainer]}>
      <View style={styles.figure}>
        <Image source={uriLogo} resizeMode='contain' style={imgStyles}></Image>
      </View>
      {
        props.displayLabel && <Text style={styles.text}>Cuida a otros</Text>
      }
    </View>
  );
}
