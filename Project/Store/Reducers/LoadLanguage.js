import { LOAD_LANGUAGE, LOAD_LIST_LANGUAGES } from '../Actions/DetailProfile';

export const SPANISH_LANG = 'ES';
export const ENGLISH_LANG = 'EN';
const ALLOWED_LANGS = [SPANISH_LANG, ENGLISH_LANG];

export function loadLanguage (state, action) {
  if (action.type === LOAD_LANGUAGE &&
      ALLOWED_LANGS.includes(action.payload)) {
    return action.payload
  }
  return state || SPANISH_LANG;
}

export function loadListLanguages (state, action) {
  if (action.type === LOAD_LIST_LANGUAGES) {
    return action.payload
  }
  return state || [];
}
