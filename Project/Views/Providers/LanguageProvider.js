import en_lang from '../../Localized/en.json';
import es_lang from '../../Localized/es.json';

export default function LanguageProvider(lang) {
  if (lang === 'en') {
    return en_lang;
  }
  return es_lang;
}
