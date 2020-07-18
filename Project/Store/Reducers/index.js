import { combineReducers } from 'redux';
import { loadLanguage } from './DetailProfile';

const reducers = combineReducers({
  language: loadLanguage
});
export default reducers;
