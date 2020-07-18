import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import store from '../../../../Store/store';
import LanguageProvider from '../../../Providers/LanguageProvider';

import SignUpBaseStep from './SignUpBaseStep';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  textProfileTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  checkItem: {
    color: 'black'
  }
});

class SignUpCareList extends SignUpBaseStep {
  // Remove component state
  state = {
    ...this.getInitialStepState(),
    itemsOptions: [
      {
        label: 'homeCareLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'marketLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'walkLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'procedureLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'pharmaLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'homeCleanLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'hygieneServiceLabel',
        status: 'unchecked',
        checked: false
      },
      {
        label: 'otherOptLabel',
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
    });
    // FIXME: Check at least one element
    this.validateStep();
  }

  render() {
    const langProvider = LanguageProvider(store.getState().language);
    const labelText = this.props.isPatient ? langProvider.views.signUp.signUpCareListPersonToCareTitle : langProvider.views.signUp.signUpCareListCarePersonTitle;
  
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{labelText}</Text>
        <ScrollView>
          {
            this.state.itemsOptions.map((item, index) => {
              return (
                <Checkbox.Item style={styles.checkItem}
                               label={langProvider.components.services[item.label]}
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
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(SignUpCareList);
