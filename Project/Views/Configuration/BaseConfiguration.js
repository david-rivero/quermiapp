import * as React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

export default class BaseConfiguration extends React.Component {
  backToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  goPayments = () => {
    this.props.navigation.navigate('Payments');
  }

  render() {
    return (
      <View>
        <View>
          <Image />
          <Text>Configuración</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.goPayments()}>
            <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
            <Text>Suscripción</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.backToHome()}>
          <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
          <Text>{langProvider.components.backButton.backLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
