import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  actionItem: {
    borderRadius: 100,
    height: 60,
    width: 60,
    borderColor: '#424242',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.25
  },
  actionItemCenter: {
    marginLeft: 25,
    marginRight: 25
  },
  actionIcon: {
    height: 40,
    width: 40
  },
  actionLove: {
    backgroundColor: 'red'
  },
  actionContact: {
    backgroundColor: 'blue'
  },
  actionRate: {
    backgroundColor: 'yellow'
  }
});

export default function Actions(props) {
  const loveIcon = require('../../Assets/heart.png');
  const contactIcon = require('../../Assets/social.png');
  const rateIcon = require('../../Assets/images/star.png');

  return (
    <View style={[styles.actionsContainer, props.actionsStyles]}>
      <TouchableOpacity style={[styles.actionItem, styles.actionLove]} onPress={() => {}}>
        <Image resizeMode='cover' source={loveIcon} style={styles.actionIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionItem, styles.actionContact, styles.actionItemCenter]} onPress={() => {}}>
        <Image resizeMode='cover' source={contactIcon} style={styles.actionIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionItem, styles.actionRate]} onPress={() => {props.navigation.navigate('RateProfile')}}>
        <Image resizeMode='cover' source={rateIcon} style={styles.actionIcon} />
      </TouchableOpacity>
    </View>
  );
}
