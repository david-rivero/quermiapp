import * as React from 'react';
import { Text, View, Image } from 'react-native';

export default function FullLogo() {
  const uriLogo = '../../assets/care-me-logo.png';
  return (
    <View style={styles.container}>
      <Image source={{ uri: uriLogo }}></Image>
      <Text>Cuida a otros</Text>
    </View>
  );
}
