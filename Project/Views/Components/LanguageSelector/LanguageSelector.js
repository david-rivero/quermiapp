import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { toggleLanguage } from '../../../Providers/StoreUtilProvider';
import { SPANISH_LANG } from '../../../Store/Reducers/LoadLanguage';
import styles from './LanguageSelectorStyles';

const es_flag = require('../../../Assets/images/spanish-flag.png');
const en_flag = require('../../../Assets/images/english-flag.png');
const caret = require('../../../Assets/images/caret-right.png');

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
