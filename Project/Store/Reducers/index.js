import { combineReducers } from 'redux';
import { loadLanguage, loadListLanguages } from './LoadLanguage';
import { setTokenState } from './SetLoginStatus';
import { setDetailProfile, setHomeStatus, setRateProfile } from './SetDetailProfile';
import { loadProfiles, updateProfileSearchStatus } from './ProfilesToSearch';
import { setCategories } from './SetCategories';
import { setBilling } from './Payments';

const reducers = combineReducers({
  language: loadLanguage,
  availableLangs: loadListLanguages,
  profile: setDetailProfile,
  profilesLoaded: loadProfiles,
  profileSearchStatus: updateProfileSearchStatus,
  homeStatus: setHomeStatus,
  rateProfileInfo: setRateProfile,
  categories: setCategories,
  subscriptionBillingOptions: setBilling,
  _userToken: setTokenState
});
export default reducers;
