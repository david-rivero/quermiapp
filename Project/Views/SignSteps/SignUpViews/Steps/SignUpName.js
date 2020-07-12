import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import SignUpBaseStep from './SignUpBaseStep';
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

export default class SignUpName extends SignUpBaseStep {
  state = {
    ...this.getInitialStepState()
  };

  changeText = text => {
    if (text.length) {
      this.validateStep();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>¿Cómo te llamas?</Text>
        <TextInput placeholder="Tu nombre" onChangeText={this.changeText} style={Layout.textInput}></TextInput>
      </View>
    );
  }
}
