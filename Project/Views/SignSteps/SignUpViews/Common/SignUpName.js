import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  }
});

export default function SignUpName(_) {
  return (
    <View style={styles.container}>
      <Text>¿Cómo te llamas?</Text>
      <TextInput placeholder="Tu nombre" style={Layout.textInput}></TextInput>
    </View>
  );
}
