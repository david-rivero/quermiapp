import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Layout } from '../../Theme/Layout';
import FullLogo from '../Components/FullLogo';
import LoginActions from '../Components/LoginActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12
  },
  fullLogo: {
    flex: 0.5
  },
  loginActions: {
    marginTop: 60
  }
});

export default function SignIn({ navigation }) {
  return (
    <View style={styles.container}>
      <FullLogo mode='medium' stylesContainer={styles.fullLogo} displayLabel={true}></FullLogo>
      <View>
        <TextInput placeholder="Tu email" style={Layout.textInput}></TextInput>
        <TextInput placeholder="Tu contraseña" secureTextEntry={true} style={Layout.textInput}></TextInput>
      </View>
      <View style={styles.loginActions}>
        <LoginActions navigation={navigation}></LoginActions>
      </View>
    </View>
  );
}
