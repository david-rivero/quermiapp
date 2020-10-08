import { combineReducers } from 'redux';
import { loadLanguage, loadListLanguages } from './LoadLanguage';
import { setLoginStatus, setTokenState } from './SetLoginStatus';
import { setRegisterStatus } from './SetRegisterStatus';
import { setDetailProfile, setHomeStatus, setRateProfile } from './SetDetailProfile';
import { loadProfiles, updateProfileSearchStatus } from './ProfilesToSearch';

const reducers = combineReducers({
  language: loadLanguage,
  availableLangs: loadListLanguages,
  profile: setDetailProfile,
  loginStatus: setLoginStatus,
  registerStatus: setRegisterStatus,
  profilesLoaded: loadProfiles,
  profileSearchStatus: updateProfileSearchStatus,
  homeStatus: setHomeStatus,
  rateProfileInfo: setRateProfile,
  _userToken: setTokenState
});
export default reducers;
