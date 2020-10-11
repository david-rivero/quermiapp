import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { SIGN_UP_STEP_PROFILE_SERVICES } from '../../../../Store/Actions/Categories';
import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../../../Store/Actions/UserAuth';
import store from '../../../../Store/store';
import LanguageProvider from '../../../../Providers/LanguageProvider';

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
  },
  otherOptInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});


class SignUpCareList extends SignUpBaseStep {
  _isOtherOptSelected = () => {
    const othOpt = this.props.itemsOptions.find(item => item.name === 'OTH');
    return othOpt.checked;
  }

  toggleCheck = (item, index) => {
    let newCareListState = [...this.props.itemsOptions];
    newCareListState[index].checked = !item.checked;
    newCareListState[index].status = item.checked ? 'checked' : 'unchecked';
    store.dispatch({
      type: SIGN_UP_STEP_PROFILE_SERVICES,
      payload: [...newCareListState]
    })
    this.saveCareServices(newCareListState);
  }

  setOtherOptionCareService = text => {
    const state = store.getState();
    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'profileStatus',
        profileData: {
          ...state.profile.profileStatus,
          otherCareServiceDescription: text
        }
      }
    });
  }

  saveCareServices = careListServices => {
    const careServices = careListServices
      .filter(item => item.checked)
      .map(item => { return {value: item.label, name: item.name}; });

    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'services',
        profileData: careServices
      }
    });

    if (careServices.length) {
      this.validateStep();
    } else {
      this.uncheckStep();
    }
  };

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const labelText = this.props.isPatient ? langProvider.views.signUp.signUpCareListPersonToCareTitle : langProvider.views.signUp.signUpCareListCarePersonTitle;
  
    return (
      <View style={styles.container}>
        <Text style={styles.textProfileTitle}>{labelText}</Text>
        <ScrollView>
          {
            this.props.itemsOptions.map((item, index) => {
              return (
                <Checkbox.Item style={styles.checkItem}
                               label={langProvider.components.services[item.label]}
                               onPress={() => { this.toggleCheck(item, index) }}
                               status={item.status} 
                               key={index} />
              );
            })
          }
          {
            this._isOtherOptSelected() &&
            <TextInput style={styles.otherOptInput}
                       onChangeText={text => this.setOtherOptionCareService(text)}/>
          }
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    itemsOptions: state.categories.careListServices.careListServicesName
  };
}
export default connect(mapStateToProps, null)(SignUpCareList);
