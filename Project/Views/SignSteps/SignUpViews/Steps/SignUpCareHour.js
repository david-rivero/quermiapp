import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import { SIGN_UP_STEP_DATETIMEPICKER, SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import { formatTime } from '../../../../Providers/TimeUtilsProvider'; 
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';

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
    paddingBottom: 0,
    backgroundColor: 'transparent'
  }
});

class SignUpCareHour extends SignUpBaseStep {
  setTimePicker = (event, time, location, type) => {
    store.dispatch({
      type: SIGN_UP_STEP_DATETIMEPICKER,
      payload: {
        pickerType: location,
        data: {
          show: false,
          mode: 'time'
        }
      }
    });

    if (event.type === 'set') {
      const mainField = type === 'timeStart' ? 'start' : 'end';
      const oppositeField = type === 'timeStart' ? 'end' : 'start';
      const oppositeType = type === 'timeStart' ? 'timeEnd' : 'timeStart';

      store.dispatch({
        type: SIGN_UP_STEP_SET_PROFILE_INFO,
        payload: {
          profileField: 'time',
          profileData: {
            [mainField]: time,
            [oppositeField]: this.props[oppositeType]
          }
        }
      });
      this.validateStep();
    }
  }

  showTimePicker = location => {
    store.dispatch({
      type: SIGN_UP_STEP_DATETIMEPICKER,
      payload: {
        pickerType: location,
        data: {
          show: true,
          mode: 'time'
        }
      }
    });
    Keyboard.dismiss();
  }
  
  render() {
    const langProvider = LanguageProvider(this.props.language);
    const labelText = this.props.isPatient ? langProvider.views.signUp.signUpCareHourPersonToCareTitle : langProvider.views.signUp.signUpCareHourCarePersonTitle;
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{labelText}</Text>
        <View style={styles.inputTimeRow}>
          <Text>De</Text>
          <TextInput placeholder="Hora"
                     value={formatTime(this.props.timeStart)}
                     style={styles.timeInput}
                     onFocus={() => this.showTimePicker('timePickerStartStatus', 'timeStart')} />
          <Text>a</Text>
          <TextInput placeholder="Hora"
                     value={formatTime(this.props.timeEnd)}
                     style={styles.timeInput}
                     onFocus={() => this.showTimePicker('timePickerEndStatus', 'timeEnd')} />
        </View>
        {
          this.props.timeStartShow && 
          <DateTimePicker value={this.props.timeStart}
                          mode={this.props.timeStartMode}
                          is24Hour={true}
                          onChange={(event, time) => this.setTimePicker(event, time, 'timePickerStartStatus', 'timeStart')} />
        }
        {
          this.props.timeEndShow && 
          <DateTimePicker value={this.props.timeEnd}
                          mode={this.props.timeEndMode}
                          is24Hour={true}
                          onChange={(event, time) => this.setTimePicker(event, time, 'timePickerEndStatus', 'timeEnd')} />
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    timeStart: state.profile.time.start,
    timeEnd: state.profile.time.end,
    timeStartShow: state.registerStatus.timePickerStartStatus.show,
    timeEndShow: state.registerStatus.timePickerEndStatus.show,
    timeStartMode: state.registerStatus.timePickerStartStatus.mode,
    timeEndMode: state.registerStatus.timePickerEndStatus.mode
  };
}
export default connect(mapStateToProps, null)(SignUpCareHour);
