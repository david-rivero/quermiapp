import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import { formatTime, getDateTimeFromStr } from '../../../../Providers/TimeUtilsProvider'; 
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpCareHourStyles';


class SignUpCareHour extends SignUpBaseStep {
  state = {
    tStart: {
      show: false
    },
    tEnd: {
      show: false
    }
  };

  setTimePicker = (event, time, location, type) => {
    this.setState({
      [location]: {
        show: false
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
            [mainField]: formatTime(time),
            [oppositeField]: this.props[oppositeType]
          }
        }
      });
      this.validateStep();
    }
  }

  showTimePicker = location => {
    this.setState({
      [location]: {
        ...this.state[location],
        show: true
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
                     value={this.props.timeStart}
                     style={styles.timeInput}
                     onFocus={() => this.showTimePicker('tStart')} />
          <Text>a</Text>
          <TextInput placeholder="Hora"
                     value={this.props.timeEnd}
                     style={styles.timeInput}
                     onFocus={() => this.showTimePicker('tEnd')} />
        </View>
        {
          this.state.tStart.show && 
          <DateTimePicker value={getDateTimeFromStr(this.props.timeStart, 'HH:mm')}
                          mode={'time'}
                          is24Hour={true}
                          onChange={(event, time) => this.setTimePicker(event, time, 'tStart', 'timeStart')} />
        }
        {
          this.state.tEnd.show && 
          <DateTimePicker value={getDateTimeFromStr(this.props.timeEnd, 'HH:mm')}
                          mode={'time'}
                          is24Hour={true}
                          onChange={(event, time) => this.setTimePicker(event, time, 'tEnd', 'timeEnd')} />
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    timeStart: state.profile.time.start,
    timeEnd: state.profile.time.end
  };
}
export default connect(mapStateToProps, null)(SignUpCareHour);
