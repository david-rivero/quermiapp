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

export function mapContractsToProfiles(profileRole, contracts, profiles) {
  const roleDestination = profileRole === 'PATIENT' ? 'care_person' : 'patient';
  const contractsId = contracts.map(contract => {
    return {
      ...contract[roleDestination],
      status: contract.status,
      pk: contract.pk
    };
  });
  const newProfiles = profiles.map(profile => {
    const contractFound = contractsId.find(p => p.id === profile.id);
    if (contractFound) {
      profile.contractWithCurrentProfile = {
        state: true,
        type: contractFound.status,
        contractId: contractFound.pk
      };
    }
    return profile;
  });
  return [...newProfiles];
}
