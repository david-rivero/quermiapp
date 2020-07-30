import { UPDATE_MY_PROFILE } from '../Actions/DetailProfile';
import {
  SIGN_UP,
  SIGN_UP_STEP_SET_PROFILE_INFO,
  LOG_OUT_PROFILE,
  LOGIN
} from '../Actions/UserAuth';

export function setDetailProfile(state, action) {
  const defaultProfile = {
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
  };
  switch(action.type) {
    case SIGN_UP:
    case UPDATE_MY_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case SIGN_UP_STEP_SET_PROFILE_INFO:
      return {
        ...state,
        [action.payload.profileField]: action.payload.profileData
      };
    case LOGIN:
      return {
        ...state,
        account: {
          ...action.payload
        }
      }
    case LOG_OUT_PROFILE:
      return {...defaultProfile};
    default:
      return state || defaultProfile;
  }
}
