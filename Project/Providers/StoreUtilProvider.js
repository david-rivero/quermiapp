import { UPDATE_MY_PROFILE } from '../Store/Actions/DetailProfile';
import { LOAD_LANGUAGE } from '../Store/Actions/DetailProfile';
import { SPANISH_LANG, ENGLISH_LANG } from '../Store/Reducers/LoadLanguage';
import { defaultProfile } from '../Store/Reducers/SetDetailProfile';
import store from '../Store/store';

export function resetProfileDataFromRegister() {
  store.dispatch({
    type: UPDATE_MY_PROFILE,
    payload: {...defaultProfile}
  });
}


export function resetProfileDataFromLogin() {
  store.dispatch({
    type: UPDATE_MY_PROFILE,
    payload: {...defaultProfile}
  });
}

export function toggleLanguage(lang) {
  const toggledLang = lang === SPANISH_LANG ? ENGLISH_LANG : SPANISH_LANG;
  store.dispatch({
    type: LOAD_LANGUAGE,
    payload: toggledLang
  });
}
