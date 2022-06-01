import { UserInfo } from 'types/domain';

import { UserAction } from './action';

export interface UserState {
  loading: 'getUser' | 'login' | 'signup' | null;
  data: UserInfo | null;
  error: string | null;
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
      return state;
    case 'user/SIGN_UP_FAILURE':
      return { ...state, loading: null, error: action.payload };
    case 'user/LOGOUT':
      return { ...state, data: null };
    default:
      return state;
  }
};
