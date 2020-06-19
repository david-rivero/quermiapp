import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '25%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});

export default function SignUpName(_) {
  return (
    <View style={styles.container}>
      <Text style={styles.textProfileTitle}>¿Cómo te llamas?</Text>
      <TextInput placeholder="Tu nombre" style={Layout.textInput}></TextInput>
    </View>
  );
}
