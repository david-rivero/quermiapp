import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import LanguageProvider from '../../../Providers/LanguageProvider';
import * as RNFS from 'react-native-fs';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { getFormatFromImage } from '../../../Providers/FileUtilsProvider';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../Store/Actions/UserAuth';
import store from '../../../Store/store';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import { Spinner } from '../../Components/Spinner/Spinner';
import Header from '../../Components/Header/Header';

import { requestDataEndpoint, DEFAULT_HEADERS } from '../../../Providers/EndpointServiceProvider';
import styles from './CheckIDPhotoStyles';

const imageCamera = require('../../../Assets/images/photo-camera.png');
const imagePhoto = require('../../../Assets/images/picture.png');
const caretLogo = require('../../../Assets/images/caret-right.png');
const idDocLogo = require('../../../Assets/images/id-card.png');


class CheckIDPhoto extends React.Component {
  state = {
    actionFrom: '',
    loading: false
  };

  setCamera = () => {
    this.setState({ actionFrom: 'camera' });
    this.props.navigation.navigate('Camera', { from: 'idPhoto' });
  };

  showFilePicker = () => {
    this.setState({ actionFrom: 'file' });
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
                  profilePhoto: this.props.myProfile.pictsOnRegister.profilePhoto 
                }
              }
            });
          })
          .catch(err => console.log(err.message, err.code));
      }
    });
  };

  saveIdPhoto = () => {
    const headers = {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.props.token}`
    };
    const data = { id_doc_photo: this.props.myProfile.pictsOnRegister.documentID };
    const params = [
      { key: '$profile_id', value: this.props.myProfile.id }
    ];

    this.setState({ loading: true });
    requestDataEndpoint('profileDetail', data, 'PATCH', '', params, headers).pipe(
      concatMap(result => {
        if (!result.error) {
          return requestDataEndpoint('profileDetail', undefined, 'GET', '', params, headers)
        }
        return of(result);
      })
    ).subscribe(dd => {
      if (!dd.error) {
        store.dispatch({
          type: SIGN_UP_STEP_SET_PROFILE_INFO,
          payload: {
            profileField: 'pictsOnRegister',
            profileData: {
              documentID: dd.doc_id_photo_url,
              profilePhoto: this.props.myProfile.pictsOnRegister.profilePhoto
            }
          }
        });
        this.props.navigation.navigate('HomeSignedIn');
      }
      this.setState({ loading: false });
    });
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <Header></Header>
        {
          typeof(this.props.myProfile.pictsOnRegister.documentID) !== 'string' && 
          <View style={styles.contentSection}>
            <Text style={styles.textProfileTitle}>{langProvider.views.signUp.signUpIDPhotoTitle}</Text>
            <View style={styles.inputContent}>
              <TouchableOpacity style={[styles.photoInput, this.state.actionFrom === 'camera' && this.props.myProfile.pictsOnRegister.documentID ? styles.inputEnabled: null]}
                                onPress={() => this.setCamera()}>
                <Image source={imageCamera} style={styles.img} resizeMode='contain' />
                <Text>{langProvider.views.signUp.signUpPhotoCameraLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.photoInput, this.state.actionFrom === 'file' && this.props.myProfile.pictsOnRegister.documentID ? styles.inputEnabled: null]}
                                onPress={() => this.showFilePicker()}>
                <Image source={imagePhoto} style={styles.img} resizeMode='contain' />
                <Text>{langProvider.views.checkIdPhoto.signUpPhotoFileLabel}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.savePhotoActionBtn}
                              onPress={() => this.saveIdPhoto()}>
              <Text style={styles.savePhotoActionBtnText}>{langProvider.views.checkIdPhoto.signUpPhotoFileLabel}</Text>
            </TouchableOpacity>
          </View>
        }
        {
          (this.props.myProfile.pictsOnRegister.documentID && typeof(this.props.myProfile.pictsOnRegister.documentID) === 'string' && !this.props.myProfile.verifiedProfile) &&
          <View style={styles.checkInProgressView}>
            <View style={styles.checkInProgressTextContainer}>
              <Image style={styles.checkInProgressLogo} source={idDocLogo} resizeMode='contain'/>
              <Text style={styles.checkInProgressText}>Profile identification is reviewed. Please wait</Text>
            </View>
            <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToHome()}>
              <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
              <Text>{langProvider.components.backButton.backLabel}</Text>
            </TouchableOpacity>
          </View>
        }
        {
          this.state.loading && 
          <Spinner />
        }
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    language: state.language,
    myProfile: state.profile,
    token: state._userToken.token
  };
}
export default connect(mapStateToProps, null)(
  AuthViewCheckProvider(CheckIDPhoto));
