import * as React from 'react';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SIGN_UP_STEP_SET_PROFILE_INFO, SIGN_UP_STEP_DATETIMEPICKER } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

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

class SignUpBirthDate extends SignUpBaseStep {
  _formatDate = date => {
    if (date) {
      const day = date.getDate();
      const month = `${date.getMonth() < 9 && '0'}${date.getMonth() + 1}`;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return '';
  }

  setDate = (e, selectedDate) => {
    store.dispatch({
      type: SIGN_UP_STEP_DATETIMEPICKER,
      payload: {
        pickerType: 'datePickerStatus',
        data: {
          mode: 'date',
          show: false
        }
      }
    });

    if (e.type === 'set') {
      store.dispatch({
        type: SIGN_UP_STEP_SET_PROFILE_INFO,
        payload: {
          profileField: 'birthDate',
          profileData: selectedDate
        }
      });
      this.validateStep();
    }
  }

  showDatepicker = () => {
    store.dispatch({
      type: SIGN_UP_STEP_DATETIMEPICKER,
      payload: {
        pickerType: 'datePickerStatus',
        data: {
          mode: 'date',
          show: true
        }
      }
    });
    Keyboard.dismiss();
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpBirthDateTitle}</Text>
        <TextInput placeholder="Tu fecha" value={this._formatDate(this.props.date)} onFocus={this.showDatepicker} style={Layout.textInput}></TextInput>
        {
          this.props.datePickerStatus.show &&
          <DateTimePicker value={this.props.date}
                          mode={this.props.datePickerStatus.mode}
                          onChange={this.setDate} />
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    datePickerStatus: state.registerStatus.datePickerStatus,
    date: state.profile.birthDate
  };
}
export default connect(mapStateToProps, null)(SignUpBirthDate);
