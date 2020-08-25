import { createStore } from 'redux';
import reducers from './Reducers/index';

import { SPANISH_LANG } from './Reducers/LoadLanguage';

/**
  Add to initialState -->s
  messagesCurrentProfile: []

 */

let initialState = {
  // Current app language
  language: SPANISH_LANG,
  // Available languages,
  availableLangs: [],
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
    },
    profileStatus: {
      covidTestCheck: false,
      autonomousProfessionalCheck: false,
      otherCareServiceDescription: ''
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
    lastActionFromIDPhoto: '',
    lastActionFromProfilePhoto: '',
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
  },
  profilesLoaded: [],
  profileSearchStatus: {
    currentProfileIndex: 0,
    galleryEnabledIndex: 0
  },
  homeStatus: {
    menuOpened: false
  }
};

const store = createStore(reducers, initialState);
export default store;
