import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  image: {
    width: '70%',
    height: '8%'
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});


export default function FullLogo() {
  const uriLogo = require('../../assets/care-me-logo.png');
  return (
    <View style={styles.container}>
      <Image source={uriLogo} style={styles.image}></Image>
      <Text style={styles.text}>Cuida a otros</Text>
    </View>
  );
}
