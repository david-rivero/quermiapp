import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default function SignUpCareList(props) {
  const itemsOptions = [
    {
      label: 'Atención en el hogar',
      status: false
    },
    {
      label: 'Supermercado',
      status: false
    },
    {
      label: 'Paseo',
      status: false
    },
    {
      label: 'Trámites',
      status: false
    },
    {
      label: 'Farmacia',
      status: false
    },
    {
      label: 'Limpieza en el hogar',
      status: false
    },
    {
      label: 'Higiene',
      status: false
    },
    {
      label: 'Otros',
      status: false
    }
  ];
  const labelText = props.isPatient ? '¿Qué cuidados necesitas?' : '¿Qué cuidados ofreces?'

  return (
    <View style={styles.container}>
      <Text>{labelText}</Text>
      <View>
        {
          itemsOptions.map((item, index) => {
            // onPress={() => { this.setState({ checked: !checked }); }}
            return (
              <Checkbox.Item label={item.label}
                             status={item.status} 
                             key={index} />
            )
          })
        }
      </View>
    </View>
  );
}
