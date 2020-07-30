import {
  SIGN_UP_STEP,
  SIGN_UP_STEP_DATETIMEPICKER,
  SIGN_UP_STEP_PROFILE_SERVICES,
  SIGN_UP_STEP_TERMS_CONDS,
  LOAD_SERVICES_API
} from '../Actions/UserAuth';

export function setRegisterStatus(state, action) {
  switch(action.type) {
    case SIGN_UP_STEP:
      return {
        ...state,
        ...action.payload
      };
    case SIGN_UP_STEP_DATETIMEPICKER:
      return {
        ...state,
        [action.payload.pickerType]: {
          ...action.payload.data
        }
      }
    case SIGN_UP_STEP_PROFILE_SERVICES:
      return {
        ...state,
        careListServices: [...action.payload]
      }
    case SIGN_UP_STEP_TERMS_CONDS:
      return {
        ...state,
        termsAndConditions: {
          ...action.payload
        }
      }
    case LOAD_SERVICES_API:
      let listServicesAPI = {};
      action.payload.map(item => {
        listServicesAPI[item.name] = {id: item.id};
      });
      return {
        ...state,
        careListServicesAPIMap: { ...listServicesAPI }
      }
    default:
      return state || {
        nextStep: false,
        indexActive: 0,
        termsAndConditions: {
          termsNCondsChecked: 'unchecked',
          termsNCondsBool: false
        },
        datePickerStatus: {
          mode: 'date',
          show: false
        },
        timePickerStartStatus: {
          mode: 'time',
          show: false
        },
        timePickerEndStatus: {
          mode: 'time',
          show: false
        },
        careListServices: [
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
      };
  }
}
