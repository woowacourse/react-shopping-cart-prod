import { Action, StoreState } from 'types';
import { TYPES } from 'redux/actions';
import axios from 'axios';

const initialState: StoreState['customerState'] = {
  isLoading: false,
  error: null,
  userId: null,
  isSignupSuccessful: false,
  isUpdateProfileSuccessful: false,
  isUnregisterSuccessful: false,
  accessToken: null,
  customer: null,
};

const customer = (state = initialState, action: Action) => {
  switch (action.type) {
    case TYPES.INITIALIZE_CUSTOMER: {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }

      return { ...state, userId, accessToken };
    }
    case `${TYPES.SIGN_IN}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSignupSuccessful: false,
      };
    }
    case `${TYPES.SIGN_IN}_FULFILLED`: {
      const { userId, accessToken } = action.payload;

      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', accessToken);

      if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }

      return { ...state, isLoading: false, userId, accessToken };
    }
    case `${TYPES.SIGN_IN}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case TYPES.SIGN_OUT: {
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');

      return { ...state, userId: null, accessToken: null, customer: null };
    }
    case `${TYPES.SIGN_UP}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSignupSuccessful: false,
      };
    }
    case `${TYPES.SIGN_UP}_FULFILLED`: {
      return { ...state, isLoading: false, isSignupSuccessful: true };
    }
    case `${TYPES.SIGN_UP}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isSignupSuccessful: false,
      };
    }
    case `${TYPES.GET_CUSTOMER}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_CUSTOMER}_FULFILLED`: {
      return { ...state, isLoading: false, customer: action.payload };
    }
    case `${TYPES.GET_CUSTOMER}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.UPDATE_PROFILE}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isUpdateProfileSuccessful: false,
      };
    }
    case `${TYPES.UPDATE_PROFILE}_FULFILLED`: {
      return { ...state, isLoading: false, isUpdateProfileSuccessful: true };
    }
    case `${TYPES.UPDATE_PROFILE}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.UNREGISTER}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isUnregisterSuccessful: false,
      };
    }
    case `${TYPES.UNREGISTER}_FULFILLED`: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');

      return { ...state, isLoading: false, isUnregisterSuccessful: true };
    }
    case `${TYPES.UNREGISTER}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      console.log('state', state);
      return state;
    }
  }
};

export default customer;
