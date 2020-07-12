import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
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
  }
});

export default class SignUpBirthDate extends SignUpBaseStep {
  state = {
    ...this.getInitialStepState(),
    datePickerStatus: {
      mode: 'date',
      show: false
    },
    date: new Date(1598051730000)
  };

  _formatDate = (date) => {
    const day = date.getDate();
    const month = `${date.getMonth() < 9 && '0'}${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  setDate = (_, selectedDate) => {
    this.setState({
      date: selectedDate,
      datePickerStatus: {
        show: false
      }
    });
    this.validateStep();
  }

  showDatepicker = () => {
    this.setState({
      datePickerStatus: {
        mode: 'date',
        show: true
      }
    });
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>¿Cuándo naciste?</Text>
        <TextInput placeholder="Tu fecha" value={this._formatDate(this.state.date)} onFocus={this.showDatepicker} style={Layout.textInput}></TextInput>
        {
          this.state.datePickerStatus.show &&
          <DateTimePicker value={this.state.date}
                          mode={this.state.datePickerStatus.mode}
                          onChange={this.setDate} />
        }
      </View>
    );
  }
}
