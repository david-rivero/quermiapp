import * as React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SIGN_UP_STEP_TERMS_CONDS } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';


import { Checkbox } from 'react-native-paper';

import SignUpBaseStep from './SignUpBaseStep';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textContainer: {
    flex: 1
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -25,
    marginBottom: 10
  },
  declarationText: {
  
  },
  checkboxDisclaimerText: {
    flex: 1
  }
});

class SignUpDisclaimer extends SignUpBaseStep {
  toggleCheck = () => {
    store.dispatch({
      type: SIGN_UP_STEP_TERMS_CONDS,
      payload: {
        termsNCondsChecked: !this.props.termsNCondsBool ? 'checked' : 'unchecked',
        termsNCondsBool: !this.props.termsNCondsBool
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.termsNCondsBool !== this.props.termsNCondsBool &&
        this.props.termsNCondsBool) {
      this.validateStep();
    } else {
      this.uncheckStep();
    }
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{langProvider.views.signUp.signUpDisclaimerTitle}</Text>
          <View style={styles.declarationText}>
            <Text>{langProvider.views.signUp.signUpDisclaimerDesc}</Text>
            <TouchableOpacity onPress={() => {}}><Text>{langProvider.views.signUp.signUpDisclaimerLink}</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.checkRow}>
          <Checkbox.Item style={styles.checkboxDisclaimer}
                         onPress={() => { this.toggleCheck() }}
                         status={this.props.termsNCondsChecked} />
          <Text style={styles.checkboxDisclaimerText}>{langProvider.views.signUp.signUpDisclaimerCheckLabel}</Text>
        </View>
        <View>
          <Button title={langProvider.views.signUp.signUpDisclaimerContinue} 
                  onPress={() => this.props.checkFinalStep()} />
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    termsNCondsChecked: state.registerStatus.termsAndConditions.termsNCondsChecked,
    termsNCondsBool: state.registerStatus.termsAndConditions.termsNCondsBool
  };
}
export default connect(mapStateToProps, null)(SignUpDisclaimer);
