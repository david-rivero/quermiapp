import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import * as RNFS from 'react-native-fs';
import LanguageProvider from '../../../../Providers/LanguageProvider';
import { getFormatFromImage } from '../../../../Providers/FileUtilsProvider';
import { SIGN_UP_STEP_SET_PROFILE_INFO, SIGN_UP_STEP } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';

import SignUpBaseStep from './SignUpBaseStep';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  inputContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  photoInput: {
    width: 135,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 50
  },
  inputEnabled: {
    borderWidth: 3,
    borderColor: '#F28998',
    padding: 5
  }
});

class SignUpProfilePhoto extends SignUpBaseStep {
  _setLatestAction = actionFrom => {
    store.dispatch({
      type: SIGN_UP_STEP,
      payload: {lastActionFromProfilePhoto: actionFrom}
    });
  }

  setCamera = () => {
    this._setLatestAction('camera');
    this.props.navigation.navigate('Camera', { from: 'profilePhoto' });
  };

  showFilePicker = () => {
    this._setLatestAction('file');
    FilePickerManager.showFilePicker(null, (response) => {     
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        RNFS.readFile(response.uri, 'base64')
          .then(data => {
            console.log(response);
            store.dispatch({
              type: SIGN_UP_STEP_SET_PROFILE_INFO,
              payload: {
                profileField: 'pictsOnRegister',
                profileData: {
                  profilePhoto: {
                    data: data,
                    name: response.fileName,
                    type: getFormatFromImage(response.type)
                  },
                  documentID: this.props.documentID 
                }
              }
            });
          })
          .catch(err => console.log(err.message, err.code));
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.profilePhoto !== this.props.profilePhoto && this.props.profilePhoto) {
      this.validateStep();
    } else if (!this.props.profilePhoto) {
      this.uncheckStep();
    }
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const imageCamera = require('../../../../Assets/images/photo-camera.png');
    const imagePhoto = require('../../../../Assets/picture.png');

    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpProfilePhotoTitle}</Text>
        <View style={styles.inputContent}>
          <TouchableOpacity style={[styles.photoInput, this.props.actionFrom === 'camera' && this.props.nextStep ? styles.inputEnabled: null]}
                            onPress={() => this.setCamera()}>
            <Image source={imageCamera} style={styles.img} resizeMode='contain' />
            <Text>{langProvider.views.signUp.signUpPhotoCameraLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.photoInput, this.props.actionFrom === 'file' && this.props.nextStep ? styles.inputEnabled: null]}
                            onPress={() => this.showFilePicker()}>
            <Image source={imagePhoto} style={styles.img} resizeMode='contain' />
            <Text>{langProvider.views.signUp.signUpPhotoFileLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    profilePhoto: state.profile.pictsOnRegister.profilePhoto,
    documentID: state.profile.pictsOnRegister.documentID,
    actionFrom: state.registerStatus.lastActionFromProfilePhoto,
    nextStep: state.registerStatus.nextStep
  };
}
export default connect(mapStateToProps, null)(SignUpProfilePhoto);
