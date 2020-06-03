import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default function SignUpUserPass(props) {
  return (
    <View style={styles.container}>
      <Text>Por último te pedimos</Text>
      <TextInput placeholder="Tu email" style={Layout.textInput}></TextInput>
      <TextInput placeholder="Tu contraseña" style={Layout.textInput}></TextInput>
    </View>
  );
}
