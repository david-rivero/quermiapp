import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Layout } from '../../Theme/Layout';

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  figureBig: {
    flex: 0.95
  },
  figureMedium: {
    flex: 0.5
  },
  figureLittle: {
    flex: 0.45
  },
  image: {
    flex: 1
  },
  text: {
    marginTop: 20,
    color: 'white',
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
    <View style={styles.logo}>
      <View style={styles.figure}>
        <Image source={uriLogo} resizeMode='contain' style={imgStyles}></Image>
      </View>
      {
        props.displayLabel && <Text style={styles.text}>Cuida a otros</Text>
      }
    </View>
  );
}
