import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { formatDate } from '../../Providers/TimeUtilsProvider';

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionItem: {
    borderRadius: 1000,
    height: 60,
    width: 60,
    // borderColor: '#424242',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: 'black',
    shadowOpacity: 1.0
  },
  actionItemCenter: {
    marginLeft: 25,
    marginRight: 25,
    height: 80,
    width: 80,
  },
  actionIcon: {
    height: 40,
    width: 40
  },
  actionIconCenter: {
    height: 50,
    width: 50
  },
  actionDetail: {
    backgroundColor: '#fafafa'
  }
});

export default function Actions(props) {
  const loveIcon = require('../../Assets/images/heart-pink.png');
  const contactIcon = require('../../Assets/images/social-orange.png');
  const rateIcon = require('../../Assets/images/star-border.png');

  return (
    <View style={[styles.actionsContainer, props.actionsStyles]}>
      <TouchableOpacity style={[styles.actionItem, props.isDetail && styles.actionDetail]} onPress={() => {}}>
        <Image resizeMode='cover' source={loveIcon} style={styles.actionIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionItem, styles.actionItemCenter, props.isDetail && styles.actionDetail]} onPress={() => {}}>
        <Image resizeMode='cover' source={contactIcon} style={styles.actionIconCenter} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionItem, props.isDetail && styles.actionDetail]} onPress={() => {props.navigation.navigate('RateProfile')}}>
        <Image resizeMode='cover' source={rateIcon} style={styles.actionIcon} />
      </TouchableOpacity>
    </View>
  );
}
