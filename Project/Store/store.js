import { createStore } from 'redux';
import reducers from './Reducers/index';

import { SPANISH_LANG } from './Reducers/DetailProfile';

/**
  Add to initialState -->

  // Profile on register and user
  profile: {
    registerMode: false,
    profileRole: '',
    name: '',
    birthDate: '',
    pictsOnRegister: {
      documentID: null,
      profilePhoto: null
    },
    accountOnRegister: {
      email: '',
      password: ''
    },
    services: [],
    time: {
      start: '',
      end: ''
    }
  },
  profilesLoaded: [],
  messagesCurrentProfile: []

 */

let initialState = {
  // Current app language
  language: SPANISH_LANG
};

const store = createStore(reducers, initialState);
export default store;
