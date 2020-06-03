import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({});

export default class SignUpBirthDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerMode: 'date',
      date: new Date(1598051730000)
    };
  }

  showDatepicker() {

  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>¿Cuándo naciste?</Text>
        <DateTimePicker value={this.state.date} mode={this.state.datePickerMode} onPress={this.showDatepicker} title="Show date picker!" />
      </View>
    );
  }
}
