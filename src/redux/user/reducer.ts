import { UserInfo } from 'types/domain';

import { UserAction } from './action';

export interface UserState {
  loading: 'getUser' | 'login' | 'signup' | 'edit' | 'delete' | null;
  data: UserInfo | null;
  error: Error | null;
}

export const initialState: UserState = {
  loading: null,
  data: null,
  error: null,
};
export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'user/GET_USER_REQUEST':
      return { ...state, loading: 'getUser' };
    case 'user/GET_USER_SUCCESS':
      return { ...state, loading: null, data: action.payload };
    case 'user/GET_USER_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'user/LOGIN_REQUEST':
      return { ...state, loading: 'login' };
    case 'user/LOGIN_SUCCESS':
      return { ...state, loading: null, data: { name: action.payload.name, loginId: null } };
    case 'user/LOGIN_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'user/SIGN_UP_REQUEST':
      return { ...state, loading: 'signup' };
    case 'user/SIGN_UP_SUCCESS':
      return { ...state, loading: null };
    case 'user/SIGN_UP_FAILURE':
      return { ...state, loading: null, error: action.payload };
    case 'user/LOGOUT':
      return { ...state, data: null };

    case 'user/EDIT_REQUEST':
      return { ...state, loading: 'edit' };
    case 'user/EDIT_SUCCESS':
      return { ...state, loading: null, data: { ...state.data, name: action.payload.name } };
    case 'user/EDIT_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'user/DELETE_REQUEST':
      return { ...state, loading: 'delete' };
    case 'user/DELETE_SUCCESS':
      return { ...state, loading: null, data: null };
    case 'user/DELETE_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'user/RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};
