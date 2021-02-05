import { combineReducers } from 'redux';
import getIntl from '../../utils/intlProvider';

export function error(state = null, action) {
  switch (action.type) {
    case 'HOURS_LIST_ERROR':
      return action.error;

    case 'HOURS_LIST_MERCURE_DELETED':
      const intl = getIntl();
      return intl.formatMessage({id:"employee.mercure_deleted", defaultMessage:"{label} has been deleted by another user."}, {label: action.retrieved['@id']});

    case 'HOURS_LIST_RESET':
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'HOURS_LIST_LOADING':
      return action.loading;

    case 'HOURS_LIST_RESET':
      return false;

    default:
      return state;
  }
}

export function retrieved(state = null, action) {
  switch (action.type) {
    case 'HOURS_LIST_SUCCESS':
      return action.retrieved;

    case 'HOURS_LIST_RESET':
      return null;

    case 'HOURS_LIST_MERCURE_MESSAGE':
      return {
        ...state,
        'hydra:member': state['hydra:member'].map(item =>
          item['@id'] === action.retrieved['@id'] ? action.retrieved : item
        )
      };

    case 'HOURS_LIST_MERCURE_DELETED':
      return {
        ...state,
        'hydra:member': state['hydra:member'].filter(
          item => item['@id'] !== action.retrieved['@id']
        )
      };

    default:
      return state;
  }
}

export function eventSource(state = null, action) {
  switch (action.type) {
    case 'HOURS_LIST_MERCURE_OPEN':
      return action.eventSource;

    case 'HOURS_LIST_RESET':
      return null;

    default:
      return state;
  }
}

export function query(state = null, action) {
  switch (action.type) {
    case 'HOURS_LIST_QUERY':
      return action.query;

    // Do not clear in case of 'HOURS_LIST_RESET'

    default:
      return state;
  }
}

export default combineReducers({ error, loading, retrieved, eventSource, query });