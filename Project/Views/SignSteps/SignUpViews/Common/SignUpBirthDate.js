import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  }
});

export default class SignUpBirthDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerStatus: {
        mode: 'date',
        show: false
      },
      date: new Date(1598051730000)
    };
  }

  _formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
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
  }

  showDatepicker = () => {
    this.setState({
      datePickerStatus: {
        mode: 'date',
        show: true
      }
    });
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
