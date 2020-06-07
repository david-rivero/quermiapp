import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default class SignUpCareList extends React.Component {
  state = {
    itemsOptions: [
      {
        label: 'Atención en el hogar',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Supermercado',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Paseo',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Trámites',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Farmacia',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Limpieza en el hogar',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Higiene',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'Otros',
        status: 'unchecked',
        checked: false
      }
    ]
  };

  toggleCheck = (item, index) => {
    const items = [...this.state.itemsOptions];
    item.checked = !item.checked;
    item.status = item.checked ? 'checked' : 'unchecked';
    items[index] = item;

    this.setState({
      itemsOptions: items
    })
  }

  render() {
    const labelText = this.props.isPatient ? '¿Qué cuidados necesitas?' : '¿Qué cuidados ofreces?'
  
    return (
      <View style={styles.container}>
        <Text>{labelText}</Text>
        <ScrollView>
          {
            this.state.itemsOptions.map((item, index) => {
              return (
                <Checkbox.Item label={item.label}
                               onPress={() => { this.toggleCheck(item, index) }}
                               status={item.status} 
                               key={index} />
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}
