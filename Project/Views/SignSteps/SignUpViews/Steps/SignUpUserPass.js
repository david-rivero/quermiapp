import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import SignUpBaseStep from './SignUpBaseStep';
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

export default class SignUpUserPass extends SignUpBaseStep {
  state = {
    ...this.getInitialStepState()
  };

  render() {
    // FIXME: Validate automatically step
    if (!this.state.checkedStep) {
      this.validateStep();
    }

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
}
