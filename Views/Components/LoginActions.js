import * as React from 'react';
import { View, Button } from 'react-native';

export default function LoginActions(props) {
  let view = null;
  if (props.home) {
    view = (
      <View style={styles.container}>
        <Button>Inicia sesión</Button>
        <Button>Regístrate</Button>
      </View>
    );
  } else {
    view = (
      <View style={styles.container}>
        <Button>Inicia sesión</Button>
        <Button>Inicia en Google</Button>
        <Button>¿No tienes una cuenta? Regístrate</Button>
      </View>
    );
  }
  return view;
}
