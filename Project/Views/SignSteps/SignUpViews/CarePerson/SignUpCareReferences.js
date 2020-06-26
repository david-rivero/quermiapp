import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  referencesForm: {
    marginBottom: 30
  }
});

export default function SignUpCareReferences(_) {
  return (
    <View style={styles.container}>
      <Text style={styles.textProfileTitle}>Ingresa nombre y teléfono de tus referencias para validar tu experiencia</Text>
      <View style={styles.referencesForm}>
        <TextInput placeholder="Nombre" style={Layout.textInput}></TextInput>
        <TextInput placeholder="Teléfono" style={Layout.textInput}></TextInput>
      </View>
      <Button title="Agregar referencia" onClick={() => {}} />
    </View>
  );
}
