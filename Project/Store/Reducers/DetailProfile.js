import { LOAD_LANGUAGE } from '../Actions/DetailProfile';

export const SPANISH_LANG = 'es';
export const ENGLISH_LANG = 'en';
const ALLOWED_LANGS = [SPANISH_LANG, ENGLISH_LANG];

export function loadLanguage (state, action) {
  if (action.type === LOAD_LANGUAGE &&
      ALLOWED_LANGS.includes(action.payload)) {
    return action.payload
  }
  return state || SPANISH_LANG;
}
