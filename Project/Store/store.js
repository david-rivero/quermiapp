import { createStore } from 'redux';
import reducers from './Reducers/index';

import { ENGLISH_LANG } from './Reducers/LoadLanguage';
import { formatDate, formatTime } from '../Providers/TimeUtilsProvider';


let initialState = {
  // Current app language
  language: ENGLISH_LANG,
  // Available languages,
  availableLangs: [],
  // Profile loaded on app
  profile: {
    registerMode: false,
    profileRole: '',
    name: '',
    username: '',
    birthDate: formatDate(new Date()),
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
      start: formatTime(new Date()),
      end: formatTime(new Date())
    },
    profileStatus: {
      covidTestCheck: false,
      autonomousProfessionalCheck: false,
      otherCareServiceDescription: '',
      profileLoveStatus: 0
    }
  },
  categories: {
    careListServices: {
      careListServicesName: [
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
  },
  profilesLoaded: [],
  profileSearchStatus: {
    currentProfileIndex: 0,
    galleryEnabledIndex: 0
  },
  homeStatus: {
    menuOpened: false
  },
  rateProfileInfo: {
    description: '',
    rate: 0
  },
  _userToken: {
    token: '',
    refreshToken: '',
    _isValid: false
  }
};

const store = createStore(reducers, initialState);
export default store;
