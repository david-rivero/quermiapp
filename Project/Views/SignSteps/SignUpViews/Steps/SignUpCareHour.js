import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import store from '../../../../Store/store';
import LanguageProvider from '../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { Layout } from '../../../../Theme/Layout';

const styles = StyleSheet.create({
  inputTimeRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  timeInput: {
    margin: 12,
    flex: 1,
    paddingBottom: 0
  }
});

class SignUpCareHour extends SignUpBaseStep {
  // Remove component state
  state = {
    ...this.getInitialStepState(),
    timePickerStartStatus: {
      mode: 'time',
      show: false,
      time: new Date(1598051730000)
    },
    timePickerEndStatus: {
      mode: 'time',
      show: false,
      time: new Date(1598051730000)
    }
  };

  _formatTime = (time) => {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    return `${hour}:${minutes}`;
  }

  setTimePicker = (time, location) => {
    this.setState({
      [location]: {
        show: false,
        mode: 'time',
        time: time
      }
    });
    this.validateStep();
  }

  showTimePicker = location => {
    this.setState({
      [location]: {
        mode: 'time',
        show: true,
        time: new Date(1598051730000)
      }
    });
    Keyboard.dismiss();
  }
  
  render() {
    const langProvider = LanguageProvider(store.getState().language);
    const labelText = this.props.isPatient ? langProvider.views.signUp.signUpCareHourPersonToCareTitle : langProvider.views.signUp.signUpCareHourCarePersonTitle;
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{labelText}</Text>
        <View style={styles.inputTimeRow}>
          <Text>De</Text>
          <TextInput placeholder="Hora"
                     value={this._formatTime(this.state.timePickerStartStatus.time)}
                     style={[Layout.textInput, styles.timeInput]}
                     onFocus={() => this.showTimePicker('timePickerStartStatus')} />
          <Text>a</Text>
          <TextInput placeholder="Hora"
                     value={this._formatTime(this.state.timePickerEndStatus.time)}
                     style={[Layout.textInput, styles.timeInput]}
                     onFocus={() => this.showTimePicker('timePickerEndStatus')} />
        </View>
        {
          this.state.timePickerStartStatus.show && 
          <DateTimePicker value={this.state.timePickerStartStatus.time}
                          mode={this.state.timePickerStartStatus.mode}
                          is24Hour={true}
                          onChange={(_, time) => this.setTimePicker(time, 'timePickerStartStatus')} />
        }
        {
          this.state.timePickerEndStatus.show && 
          <DateTimePicker value={this.state.timePickerEndStatus.time}
                          mode={this.state.timePickerEndStatus.mode}
                          is24Hour={true}
                          onChange={(_, time) => this.setTimePicker(time, 'timePickerEndStatus')} />
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpCareHour);
