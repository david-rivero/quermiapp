import { combineReducers } from 'redux';
import { loadLanguage } from './LoadLanguage';
import { setLoginStatus } from './SetLoginStatus';
import { setRegisterStatus } from './SetRegisterStatus';
import { setDetailProfile } from './SetDetailProfile';

const reducers = combineReducers({
  language: loadLanguage,
  profile: setDetailProfile,
  loginStatus: setLoginStatus,
  registerStatus: setRegisterStatus
});
export default reducers;
