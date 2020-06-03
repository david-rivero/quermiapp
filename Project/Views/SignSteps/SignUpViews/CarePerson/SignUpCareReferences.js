import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({});

export default function SignUpCareReferences(_) {
  return (
    <View style={styles.container}>
      <Text>Ingresa nombre y teléfono de tus referencias para validar tu experiencia</Text>
      <View>
        <TextInput placeholder="Nombre" style={Layout.textInput}></TextInput>
        <TextInput placeholder="Teléfono" style={Layout.textInput}></TextInput>
      </View>
      <Button title="Agregar referencia" onClick={() => {}} />
    </View>
  );
}
