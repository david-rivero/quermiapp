import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './SidebarStyles';

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
