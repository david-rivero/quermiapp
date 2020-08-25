import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { getNameFromUriImage } from '../../Providers/FileUtilsProvider';
import { RNCamera } from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 60,
    width: 60,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  snapButton: {
    position: 'absolute',
    bottom: 20,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  savePhotoBtn: {
    color: 'white',
    fontSize: 14,
    textTransform: 'uppercase',
    marginLeft: 5,
    marginBottom: 5
  }
});

const ANDROID_CAMERA_PERMISSION_OPTIONS = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};
const ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS = {
  title: 'Permission to use audio recording',
  message: 'We need your permission to use your audio',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
}

export default class CameraComponent extends React.Component {
  state = {
    photoShot: null
  };

  setCurrentPicture = () => {
    this.props.onSetPicture(this.state.photoShot);
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const contentType = data.uri.split('.').pop();
      this.setState({
        photoShot: {
          data: data.base64,
          name: getNameFromUriImage(data.uri),
          type: contentType
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={ANDROID_CAMERA_PERMISSION_OPTIONS}
          androidRecordAudioPermissionOptions={ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS}
        />
        <View>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.setCurrentPicture} style={styles.savePhotoBtn}>
            <Text style={styles.savePhotoBtn}>Save photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
