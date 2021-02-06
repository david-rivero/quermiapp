import React from 'react';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Keyboard, TextInput } from 'react-native';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import { getDateTimeFromStr, getAgeFromDate, formatDate } from '../../../../Providers/TimeUtilsProvider'; 
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpBirthDateStyles';
import { Layout } from '../../../../Theme/Layout';


class SignUpBirthDate extends SignUpBaseStep {
  state = {
    showDatePicker: false
  };

  _isLegalAge = date => {
    const MIN_AGE = 18;
    if (date) {
      return getAgeFromDate(date) >= MIN_AGE;
    }
    return false;
  }

  setDate = (e, selectedDate) => {
    this.setState({
      showDatePicker: false
    });

    if (e.type === 'set' && selectedDate) {
      store.dispatch({
        type: SIGN_UP_STEP_SET_PROFILE_INFO,
        payload: {
          profileField: 'birthDate',
          profileData: formatDate(selectedDate)
        }
      });
      if (this._isLegalAge(selectedDate)) {
        this.validateStep();
      } else {
        this.uncheckStep();
      }
    }
  }

  showDatepicker = () => {
    this.setState({
      showDatePicker: true
    });
    Keyboard.dismiss();
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpBirthDateTitle}</Text>
        <TextInput placeholder="Tu fecha" value={this.props.date} onFocus={this.showDatepicker} style={Layout.textInput}></TextInput>
        {
          !this._isLegalAge(getDateTimeFromStr(this.props.date, 'dd/MM/yyyy')) && 
          <Text style={styles.legalAgeWarning}>{langProvider.views.signUp.signUpBirthNotLegalAge}</Text>
        }
        {
          this.state.showDatePicker &&
          <DateTimePicker value={getDateTimeFromStr(this.props.date, 'dd/MM/yyyy')}
                          mode={'date'}
                          onChange={this.setDate} />
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    date: state.profile.birthDate
  };
}
export default connect(mapStateToProps, null)(SignUpBirthDate);
