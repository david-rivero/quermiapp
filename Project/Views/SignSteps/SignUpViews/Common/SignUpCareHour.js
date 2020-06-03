import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const styles = StyleSheet.create({});

export default class SignUpCareHour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerMode: 'time',
      time: new Date(1598051730000)
    };
  }

  showTimePicker() {

  }
  
  render() {
    const labelText = this.props.isPatient ? '¿Qué horarios necesitas?' : '¿Qué horarios dispones?'
    return (
      <View style={styles.container}>
        <Text>{labelText}</Text>
        <DateTimePicker value={this.state.time} mode={this.state.datePickerMode} onPress={this.showTimePicker} title="Show time picker" />
      </View>
    );
  }
}
