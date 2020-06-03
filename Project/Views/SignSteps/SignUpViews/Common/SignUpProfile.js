import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { RadioButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center'
  },
  radioBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 12
  },
  radioBtn: {
    marginLeft: 'auto'
  }
});

export default class SignUpProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsOptions: [
        {
          label: 'Persona a cuidar',
          value: 'personToCare'
        },
        {
          label: 'Prestador de cuidados',
          value: 'personCareProvider'
        }
      ],
      profileValue: null
    };
  }

  setProfileStatus = value => {
    this.setState({
      profileValue: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Cuéntanos quién eres</Text>
        <RadioButton.Group onValueChange={profileValue => this.setProfileStatus(profileValue)}
                           value={this.state.profileValue}>
          {
            this.state.itemsOptions.map((item, index) => {
              return (
                <View key={index} style={styles.radioBtnContainer}>
                  <Text>{item.label}</Text>
                  <RadioButton style={styles.radioBtn} value={item.value} />
                </View>
              );
            })
          }
        </RadioButton.Group>
      </View>
    );
  }
}
