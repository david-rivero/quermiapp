import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image } from 'react-native';
import LanguageProvider from '../../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';
import { Colors } from '../../../../Theme/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '25%'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  inputContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
  },
  photoInput: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    width: 135,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 50
  }
});

class SignUpProfilePhoto extends SignUpBaseStep {
  setCamera = () => {
    this.props.navigation.navigate('Camera');
  };

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const imagePhoto = require('../../../../Assets/picture.png');

    // FIXME: Validate automatically step
    if (!this.props.checkedStep) {
      this.validateStep();
    }

    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpProfilePhotoTitle}</Text>
        <View style={styles.inputContent}>
          <TouchableOpacity style={styles.photoInput} onPress={() => this.setCamera()}>
            <Image source={imagePhoto} style={styles.img} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    checkedStep: state.registerStatus.nextStep // Remove this state
  };
}
export default connect(mapStateToProps, null)(SignUpProfilePhoto);
