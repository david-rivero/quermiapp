import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});

export default function SignUpUserPass(_) {
  return (
    <View style={Layout.container}>
      <Text style={styles.textProfileTitle}>Por último te pedimos</Text>
      <View style={styles.container}>
        <TextInput placeholder="Tu email" style={Layout.textInput}></TextInput>
        <TextInput placeholder="Tu contraseña" secureTextEntry={true} style={Layout.textInput}></TextInput>
      </View>
    </View>
  );
}
