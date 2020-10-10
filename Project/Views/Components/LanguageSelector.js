import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { toggleLanguage } from '../../Providers/StoreUtilProvider';
import { SPANISH_LANG } from '../../Store/Reducers/LoadLanguage';

const es_flag = require('../../Assets/images/spanish-flag.png');
const en_flag = require('../../Assets/images/english-flag.png');
const caret = require('../../Assets/caret-right.png');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flagImg: {
    width: 32,
    height: 21
  },
  caretLogo: {
    height: 12,
    width: 12,
    marginLeft: 8,
    transform: [{rotate: '90deg'}]
  }
});

export default function LanguageSelector(props) {
  const langSrc = props.language === SPANISH_LANG ? es_flag : en_flag;
  return (
    <View>
      <TouchableOpacity style={styles.container}
                        onPress={() => toggleLanguage(props.language)}>
        <Image source={langSrc} resizeMode='cover' style={styles.flagImg} />
        <View>
          <Image source={caret} resizeMode='cover' style={styles.caretLogo} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
