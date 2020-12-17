import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: '100%',
    width: 200,
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginBottom: 12
  },
  profileText: {
    marginBottom: 15,
    color: 'black'
  },
  menuLink: {
    marginVertical: 5,
    height: 40,
    width: '100%'
  },
  menuLinkText: {
    fontSize: 18
  }
});


export default function Sidebar (props) {
  return (
    <View style={styles.view}>
      <View>
        <Image source={{uri: props.profilePhotoURI}} resize='cover' style={styles.profilePhoto}></Image>
        <Text style={styles.profileText}>{props.textConfig.greeting} {props.profileName}</Text>
      </View>
      <TouchableOpacity onPress={() => props.navSettingsAction && props.navSettingsAction()}
                        style={styles.menuLink}>
        <Text style={styles.menuLinkText}>{props.textConfig.navSettingsLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.logoutAction && props.logoutAction()}
                        style={styles.menuLink}>
        <Text style={styles.menuLinkText}>{props.textConfig.logoutLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
