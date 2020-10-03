import { UPDATE_MY_PROFILE, TOGGLE_MENU_OPEN, SET_RATE_INFO_PROFILE, RESET_RATE_INFO_PROFILE } from '../Actions/DetailProfile';
import {
  SIGN_UP,
  SIGN_UP_STEP_SET_PROFILE_INFO,
  LOG_OUT_PROFILE,
  LOGIN
} from '../Actions/UserAuth';
import { formatDate, formatTime } from '../../Providers/TimeUtilsProvider';

export const defaultProfile = {
  registerMode: false,
  profileRole: '',
  name: '',
  birthDate: formatDate(new Date()),
  username: '',
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
};

export function setDetailProfile(state, action) {
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

export function setHomeStatus(state, action) {
  if (action.type === TOGGLE_MENU_OPEN) {
    return {
      ...state,
      menuOpened: action.payload
    };
  }
  return state || {
    menuOpened: false
  };
}

export function setRateProfile(state, action) {
  const defaultState = {
    description: '',
    rate: 0
  };

  switch(action.type) {
    case SET_RATE_INFO_PROFILE:
      return {...action.payload};
    case RESET_RATE_INFO_PROFILE:
      return {...defaultState};
    default:
      return state || {...defaultState};
  }
}
