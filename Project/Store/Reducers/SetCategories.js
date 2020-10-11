import {
  SIGN_UP_STEP_PROFILE_SERVICES,
  LOAD_SERVICES_API
} from '../Actions/Categories';

const defaultState = {
  categories: {
    careListServices: {
      careListServicesName: [
        {
          label: 'homeCareLabel',
          status: 'unchecked',
          name: 'HCR',
          checked: false
        },
        {
          label: 'marketLabel',
          status: 'unchecked',
          name: 'MOR',
          checked: false
        },
        {
          label: 'walkLabel',
          status: 'unchecked',
          name: 'WKR',
          checked: false
        },
        {
          label: 'procedureLabel',
          status: 'unchecked',
          name: 'PRO',
          checked: false
        },
        {
          label: 'pharmaLabel',
          status: 'unchecked',
          name: 'PHY',
          checked: false
        },
        {
          label: 'homeCleanLabel',
          status: 'unchecked',
          name: 'HCL',
          checked: false
        },
        {
          label: 'hygieneServiceLabel',
          status: 'unchecked',
          name: 'SFC',
          checked: false
        },
        {
          label: 'otherOptLabel',
          status: 'unchecked',
          name: 'OTH',
          checked: false
        }
      ],
      careListServicesAPIMap: {}
    }
  }
};

export function setCategories(state, action) {
  switch (action.type) {
    case SIGN_UP_STEP_PROFILE_SERVICES:
      return {
        ...state,
        careListServices: {
          ...state.careListServices,
          careListServicesName: [...action.payload]
        }
      }
    case LOAD_SERVICES_API:
      let listServicesAPI = {};
      action.payload.map(item => {
        listServicesAPI[item.name] = {id: item.id};
      });
      return {
        ...state,
        careListServices: {
          ...state.careListServices,
          careListServicesAPIMap: { ...listServicesAPI }
        }
      };
    default:
      return state || defaultState;
  }
}
