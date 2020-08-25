import {
  LOAD_PROFILES_TO_SEARCH,
  SWIPE_NEXT_PROFILE,
  SWIPE_PREV_PROFILE,
  UPDATE_GALLERY_INDEX_PROFILE_SEARCH
} from '../Actions/ProfilesToSearch';

export function updateProfileSearchStatus(state, action) {
  switch (action.type) {
    case SWIPE_NEXT_PROFILE:
      if (action.payload.isNotLatest) {
        return {
          ...state,
          currentProfileIndex: state.currentProfileIndex + 1
        };
      }
      return state;
    case SWIPE_PREV_PROFILE:
      if (action.payload.isNotFirst) {
        return {
          ...state,
          currentProfileIndex: state.currentProfileIndex - 1
        };
      }
      return state;
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
  if (action.type === LOAD_PROFILES_TO_SEARCH) {
    return [...action.payload];
  }    
  return state || [];
}
