import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import store from '../../Store/store';
import { LOAD_LANGUAGE } from '../../Store/Actions/DetailProfile';
import { SPANISH_LANG, ENGLISH_LANG } from '../../Store/Reducers/LoadLanguage';

const es_flag = require('../../Assets/images/spanish-flag.png');
const en_flag = require('../../Assets/images/english-flag.png');

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

class LanguageSelector extends React.Component {
  // Implement mapStateToProps and mapDispatchToProps to scale 
  // usage of store
  toggleLanguage = () => {
    const toggledLang = this.props.language === SPANISH_LANG ? ENGLISH_LANG : SPANISH_LANG;
    store.dispatch({
      type: LOAD_LANGUAGE,
      payload: toggledLang
    });
  }

  render() {
    const langSrc = this.props.language === SPANISH_LANG ? es_flag : en_flag;
    const caret = require('../../Assets/caret-right.png');

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.toggleLanguage()}>
          <Image source={langSrc} resizeMode='cover' style={styles.flagImg} />
          <View>
            <Image source={caret} resizeMode='cover' style={styles.caretLogo} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(LanguageSelector);
