import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import { Checkbox } from 'react-native-paper';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpDisclaimerStyles';


class SignUpDisclaimer extends SignUpBaseStep {
  state = {
    checked: 'unchecked',
    bool: false
  };

  toggleCheck = () => {
    this.setState({
      checked: !this.state.bool ? 'checked' : 'unchecked',
      bool: !this.state.bool
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.bool !== this.state.bool && this.state.bool) {
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
                         status={this.state.checked} />
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
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpDisclaimer);
