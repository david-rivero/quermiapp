import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors } from '../../../../Theme/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default function SignUpProfilePhoto(_) {
  const imagePhoto = require('../../../../Assets/picture.png');
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Te pedimos una foto para tu perfil</Text>
      <View style={styles.inputContent}>
        <View style={styles.photoInput}>
          <Image source={imagePhoto} style={styles.img} resizeMode='contain' />
        </View>
      </View>
    </View>
  );
}
