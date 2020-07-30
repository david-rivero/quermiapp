import { createStore } from 'redux';
import reducers from './Reducers/index';

import { SPANISH_LANG } from './Reducers/LoadLanguage';

/**
  Add to initialState -->
  profilesLoaded: [],
  messagesCurrentProfile: []

 */

let initialState = {
  // Current app language
  language: SPANISH_LANG,
  // Profile loaded on app
  profile: {
    registerMode: false,
    profileRole: '',
    name: '',
    birthDate: new Date(),
    pictsOnRegister: {
      documentID: null,
      profilePhoto: null
    },
    account: {
      email: '',
      password: ''
    },
    services: [],
    time: {
      start: new Date(),
      end: new Date()
    }
  },
  // Login status
  loginStatus: {
    loginError: false,
    loginMessage: ''
  },
  // Register status
  registerStatus: {
    nextStep: false,
    indexActive: 0,
    termsAndConditions: {
      termsNCondsChecked: 'unchecked',
      termsNCondsBool: false
    },
    datePickerStatus: {
      mode: 'date',
      show: false
    },
    timePickerStartStatus: {
      mode: 'time',
      show: false
    },
    timePickerEndStatus: {
      mode: 'time',
      show: false
    },
    careListServices: [
      {
        label: 'homeCareLabel',
        status: 'unchecked',
        name: 'HCR',
        checked: false
      },
      {
        label: 'marketLabel',
        status: 'unchecked',
        name: 'MOR',
        checked: false
      },
      {
        label: 'walkLabel',
        status: 'unchecked',
        name: 'WKR',
        checked: false
      },
      {
        label: 'procedureLabel',
        status: 'unchecked',
        name: 'PRO',
        checked: false
      },
      {
        label: 'pharmaLabel',
        status: 'unchecked',
        name: 'PHY',
        checked: false
      },
      {
        label: 'homeCleanLabel',
        status: 'unchecked',
        name: 'HCL',
        checked: false
      },
      {
        label: 'hygieneServiceLabel',
        status: 'unchecked',
        name: 'SFC',
        checked: false
      },
      {
        label: 'otherOptLabel',
        status: 'unchecked',
        name: 'OTH',
        checked: false
      }
    ],
    careListServicesAPIMap: {}
  }
};

const store = createStore(reducers, initialState);
export default store;
