import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import LanguageProvider from '../../Providers/LanguageProvider';


const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  figure: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  figureBig: {
    width: 250
  },
  figureMedium: {
    width: 180
  },
  figureLittle: {
    width: 120
  },
  image: {
    flex: 1
  },
  text: {
    marginTop: 20,
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  }
});


class FullLogo extends React.Component {
  render() {
    const langProvider = LanguageProvider(this.props.language);
    const mode = this.props.mode || 'medium';
    const imgStyles = [
      styles.image,
      mode === 'little' && styles.figureLittle,
      mode === 'medium' && styles.figureMedium,
      mode === 'big'    && styles.figureBig
    ];
    const uriLogo = require('../../Assets/images/quermi-full-logo.png');

    return (
      <View style={[styles.logo, this.props.stylesContainer]}>
        <View style={styles.figure}>
          <Image source={uriLogo} resizeMode='contain' style={imgStyles}></Image>
        </View>
        {
          this.props.displayLabel && <Text style={styles.text}>
            {langProvider.components.fullLogo.logoTitle}
          </Text>
        }
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(FullLogo);
