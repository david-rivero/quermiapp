import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import SignUpBaseStep from './SignUpBaseStep';
import { RadioButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: '25%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  radioBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#424242',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    paddingVertical: 12,
    marginBottom: 10
  },
  radioText: {
    flex: 1
  }
});

export default class SignUpProfile extends SignUpBaseStep {
  state = {
    ...this.getInitialStepState(),
    itemsOptions: [
      {
        label: 'Persona a cuidar',
        value: 'PATIENT'
      },
      {
        label: 'Prestador de cuidados',
        value: 'CARE_PROVIDER'
      }
    ],
    profileValue: null
  };

  setProfileStatus = value => {
    this.setState({
      profileValue: value
    });
    this.validateStep();
    this.props.onChangeProfileValue(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>Cuéntanos quién eres</Text>
        <RadioButton.Group onValueChange={profileValue => this.setProfileStatus(profileValue)}
                           value={this.state.profileValue}>
          {
            this.state.itemsOptions.map((item, index) => {
              return (
                <View key={index} style={styles.radioBtnContainer}>
                  <Text style={styles.radioText}>{item.label}</Text>
                  <RadioButton value={item.value} />
                </View>
              );
            })
          }
        </RadioButton.Group>
      </View>
    );
  }
}
