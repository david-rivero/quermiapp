import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import * as RNFS from 'react-native-fs';
import LanguageProvider from '../../../../Providers/LanguageProvider';
import { getFormatFromImage } from '../../../../Providers/FileUtilsProvider';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';

import SignUpBaseStep from './SignUpBaseStep';
import styles from './Styles/SignUpProfilePhotoStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';


const imageCamera = require('../../../../Assets/images/photo-camera.png');
const imagePhoto = require('../../../../Assets/images/picture.png');

class SignUpProfilePhoto extends SignUpBaseStep {
  state = {
    actionFrom: ''
  };

  _setLatestAction = actionFrom => {
    this.setState({ actionFrom: actionFrom });
  }

  setCamera = () => {
    this._setLatestAction('camera');
    this.props.goToCamera('profilePhoto');
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
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpProfilePhotoTitle}</Text>
        <View style={styles.inputContent}>
          <TouchableOpacity style={[styles.photoInput, this.state.actionFrom === 'camera' && this.props.nextStep ? styles.inputEnabled: null]}
                            onPress={() => this.setCamera()}>
            <Image source={imageCamera} style={styles.img} resizeMode='contain' />
            <Text>{langProvider.views.signUp.signUpPhotoCameraLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.photoInput, this.state.actionFrom === 'file' && this.props.nextStep ? styles.inputEnabled: null]}
                            onPress={() => this.showFilePicker()}>
            <Image source={imagePhoto} style={styles.img} resizeMode='contain' />
            <Text>{langProvider.views.checkIdPhoto.signUpPhotoFileLabel}</Text>
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
    documentID: state.profile.pictsOnRegister.documentID
  };
}
export default connect(mapStateToProps, null)(SignUpProfilePhoto);
