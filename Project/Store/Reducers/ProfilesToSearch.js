import {
  LOAD_PROFILES_TO_SEARCH,
  SWIPE_PROFILE,
  UPDATE_GALLERY_INDEX_PROFILE_SEARCH,
  SET_ENABLED_CONTRACTS
} from '../Actions/ProfilesToSearch';
import { ProfileSerializer } from '../../Providers/SerializerProvider';

export function updateProfileSearchStatus(state, action) {
  switch (action.type) {
    case SWIPE_PROFILE:
      return {
        ...state,
        currentProfileIndex: action.payload
      };
    case UPDATE_GALLERY_INDEX_PROFILE_SEARCH:
      return {
        ...state,
        galleryEnabledIndex: state.galleryEnabledIndex + action.payload
      };
    default:
      return state || {
        currentProfileIndex: 0,
        galleryEnabledIndex: 0
      };
  }
}

export function loadProfiles(state, action) {
  switch(action.type) {
    case SET_ENABLED_CONTRACTS:
      // FIXME: Replace logic, with a lot of profiles it could crash.
      const roleDestination = action.payload.profileRole === 'PATIENT' ? 'care_person' : 'patient';
      const profiles = action.payload.contracts.map(contract => contract[roleDestination].id);
      const newProfiles = state.map(profile => {
        if (profiles.find(p => p === profile.id)) {
          profile.contractWithCurrentProfile = true;
        }
        return ProfileSerializer.fromAPIToView(profile);
      });
      return [...newProfiles];
    case LOAD_PROFILES_TO_SEARCH:
      return [...action.payload];
    default:
      return state || [];
  }
}
