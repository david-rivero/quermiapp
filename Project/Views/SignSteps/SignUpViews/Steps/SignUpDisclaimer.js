import * as React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Checkbox } from 'react-native-paper';

import SignUpBaseStep from './SignUpBaseStep';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textContainer: {
    flex: 1
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -25,
    marginBottom: 10
  },
  declarationText: {
  
  },
  checkboxDisclaimerText: {
    flex: 1
  }
});

export default class SignUpDisclaimer extends SignUpBaseStep {
  state = {
    ...this.getInitialStepState(),
    termsNCondsChecked: false
  };

  toggleCheck = () => {
    this.setState({
      termsNCondsChecked: !this.state.termsNCondsChecked
    });
    if (this.state.termsNCondsChecked) {
      this.validateStep();
    }
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Antes de unirte</Text>
          <View style={styles.declarationText}>
            <Text>Si has usado ya Quermi o es tu primera vez, te recomendamos que leas nuestros Términos y Condiciones antes de continuar.</Text>
            <TouchableOpacity onPress={() => {}}><Text>Leer más</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.checkRow}>
          <Checkbox.Item style={styles.checkboxDisclaimer}
                         onPress={() => { this.toggleCheck() }}
                         status={this.state.termsNCondsChecked} />
          <Text style={styles.checkboxDisclaimerText}>He leído y aceptado los Términos y Condiciones declarados previamente.</Text>
        </View>
        <View>
          <Button title="Continuar" onPress={() => this.redirectToHome()} />
        </View>
      </View>
    );
  }
}
