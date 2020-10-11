import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import LanguageProvider from '../../../../Providers/LanguageProvider';
import * as RNFS from 'react-native-fs';
import { getFormatFromImage } from '../../../../Providers/FileUtilsProvider';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';

import SignUpBaseStep from './SignUpBaseStep';
import { TouchableOpacity } from 'react-native-gesture-handler';

const imageCamera = require('../../../../Assets/images/photo-camera.png');
const imagePhoto = require('../../../../Assets/picture.png');
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

class SignUpIDPhoto extends SignUpBaseStep {
  state = {
    actionFrom: ''
  };

  _setLatestAction = actionFrom => {
    this.setState({ actionFrom: actionFrom });
  }

  setCamera = () => {
    this._setLatestAction('camera');
    this.props.goToCamera('idPhoto');
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
            store.dispatch({
              type: SIGN_UP_STEP_SET_PROFILE_INFO,
              payload: {
                profileField: 'pictsOnRegister',
                profileData: {
                  documentID: {
                    data: data,
                    name: response.fileName,
                    type: getFormatFromImage(response.type)
                  },
                  profilePhoto: this.props.profilePhoto 
                }
              }
            });
          })
          .catch(err => console.log(err.message, err.code));
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.idDocPhoto !==  this.props.idDocPhoto && this.props.idDocPhoto) {
      this.validateStep();
    } else if (!this.props.idDocPhoto) {
      this.uncheckStep();
    }
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpIDPhotoTitle}</Text>
        <View style={styles.inputContent}>
          <TouchableOpacity style={[styles.photoInput, this.state.actionFrom === 'camera' && this.props.nextStep ? styles.inputEnabled: null]}
                            onPress={() => this.setCamera()}>
            <Image source={imageCamera} style={styles.img} resizeMode='contain' />
            <Text>{langProvider.views.signUp.signUpPhotoCameraLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.photoInput, this.state.actionFrom === 'file' && this.props.nextStep ? styles.inputEnabled: null]}
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
    idDocPhoto: state.profile.pictsOnRegister.documentID
  };
}
export default connect(mapStateToProps, null)(SignUpIDPhoto);
