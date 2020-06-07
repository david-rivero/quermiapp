import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});

export default function SignUpUserPass(_) {
  return (
    <View style={Layout.container}>
      <Text>Por último te pedimos</Text>
      <View style={styles.container}>
        <TextInput placeholder="Tu email" style={Layout.textInput}></TextInput>
        <TextInput placeholder="Tu contraseña" style={Layout.textInput}></TextInput>
      </View>
    </View>
  );
}
