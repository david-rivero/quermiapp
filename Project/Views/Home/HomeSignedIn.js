import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout } from '../../Theme/Layout';
import { Colors } from '../../Theme/Colors';

import Header from '../Components/Header';

const styles = StyleSheet.create({
  mainActionContent: {
    backgroundColor: Colors.pink,
    height: '30%',
    width: '100%',
    padding: 18
  },
  mainActionText: {
    color: Colors.white
  },
  homeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32
  },
  homeTitleIcon: {
    marginRight: 12,
    width: 22
  },
  homeViewContent: {
    padding: 18
  },
  homeSubView: {
    marginBottom: 15
  },
  homeRedirectAction: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeRedirectionIcon: {
    marginLeft: 5,
    width: 10
  }
});

export default class HomeSignedIn extends React.Component {
  redirectToSearchProfile = () => {
    this.props.navigation.navigate('SearchProfile');
  }

  redirectToChatGroup = () => {
    this.props.navigation.navigate('ChatList');
  }

  redirectToRateProfile = () => {
    this.props.navigation.navigate('RateProfile');
  }

  render() {
    const isPatientProfile = true;
    const caretLogoWhite = require('../../Assets/caret-right-white.png');
    const caretLogo = require('../../Assets/caret-right.png');

    return (
        <View style={Layout.container}>
          <Header />
          <View style={styles.mainActionContent}>
          <View style={styles.homeTitle}>
            <Image style={styles.homeTitleIcon} resizeMode='contain' source={require('../../Assets/nurse-white.png')} />
            <Text style={[styles.mainActionText, Layout.title]}>Busca un acompañante</Text>
          </View>
          <Text style={styles.mainActionText}>Busca una persona que te brinde la mejor atención que necesitás</Text>
          <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToSearchProfile()}>
            <Text style={styles.mainActionText}>Busca un acompañante</Text>
            <Image style={styles.homeRedirectionIcon} source={caretLogoWhite} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={styles.homeViewContent}>
          <View style={styles.homeSubView}>
            <View style={styles.homeTitle}>
              <Image style={styles.homeTitleIcon} resizeMode='contain' source={require('../../Assets/speech-bubble.png')} />
              <Text style={[Layout.title]}>Coordina actividades</Text>
            </View>
            <Text>Escribe a tus acompañante y coordina las actividades necesarias para una buena experiencia</Text>
            <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToChatGroup()}>
              <Text>Escribe a tu acompañante</Text>
              <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={styles.homeSubView}>
            <View style={styles.homeTitle}>
              <Image style={styles.homeTitleIcon} resizeMode='contain' source={require('../../Assets/heart.png')} />
              <Text style={[Layout.title]}>Califica a tu acompañante</Text>
            </View>
            <Text>Califica tu experiencia con tu actual acompañante para mejorar nuestros servicios</Text>
            <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToRateProfile()}>
              <Text>Califica a tu acompañante</Text>
              <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
