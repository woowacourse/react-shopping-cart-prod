import axios from 'axios';
import { AppDispatch, RootState } from 'redux/store';
import { deleteCookie, getCookie, setCookie } from 'utils';

export type UserState = {
  loading: boolean;
  error: Error | null;
  userName: string | null;
  isLoggedIn: boolean;
};

export type Action =
  | ReturnType<typeof loadUserRequest>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserFailure>
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof logout>
  | ReturnType<typeof deleteUserRequest>
  | ReturnType<typeof deleteUserSuccess>
  | ReturnType<typeof deleteUserFailure>
  | ReturnType<typeof changePasswordRequest>
  | ReturnType<typeof changePasswordSuccess>
  | ReturnType<typeof changePasswordFailure>
  | ReturnType<typeof signupRequest>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFailure>;

const initialState: UserState = {
  loading: false,
  error: null,
  userName: null,
  isLoggedIn: !!getCookie('accessToken'),
};

const LOAD_USER_REQUEST = 'user/LOAD_REQUEST' as const;
const LOAD_USER_SUCCESS = 'user/LOAD_SUCCESS' as const;
const LOAD_USER_FAILURE = 'user/LOAD_FAILURE' as const;
const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGIN_FAILURE = 'user/LOGIN_FAILURE' as const;
const LOGOUT = 'user/LOGOUT' as const;
const DELETE_USER_REQUEST = 'user/DELETE_REQUEST' as const;
const DELETE_USER_SUCCESS = 'user/DELETE_SUCCESS' as const;
const DELETE_USER_FAILURE = 'user/DELETE_FAILURE' as const;
const CHANGE_PASSWORD_REQUEST = 'user/CHANGE_PASSWORD_REQUEST' as const;
const CHANGE_PASSWORD_SUCCESS = 'user/CHANGE_PASSWORD_SUCCESS' as const;
const CHANGE_PASSWORD_FAILURE = 'user/CHANGE_PASSWORD_FAILURE' as const;
const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST' as const;
const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS' as const;
const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE' as const;

const loadUserRequest = () => ({ type: LOAD_USER_REQUEST });
const loadUserSuccess = (userName: string) => ({
  type: LOAD_USER_SUCCESS,
  payload: { userName },
});
const loadUserFailure = (error: Error) => ({
  type: LOAD_USER_FAILURE,
  payload: { error },
});
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const loginFailure = (error: Error) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
const logout = () => ({ type: LOGOUT });
const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
const deleteUserSuccess = () => ({ type: DELETE_USER_SUCCESS });
const deleteUserFailure = (error: Error) => ({
  type: DELETE_USER_FAILURE,
  payload: { error },
});
const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST });
const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS });
const changePasswordFailure = (error: Error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { error },
});
const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
const signupFailure = (error: Error) => ({
  type: SIGNUP_FAILURE,
  payload: { error },
});

const loadUserAPI = (): any => async (dispatch: AppDispatch) => {
  const token = getCookie('accessToken');
  if (!token) {
    return;
  }

  dispatch(loadUserRequest());
  try {
    const { data: userName } = await axios.get('/api/customers/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(loadUserSuccess(userName));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadUserFailure(error));
    }
  }
};

const loginAPI =
  (userName: string, password: string, onSuccess?: () => void): any =>
  async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await axios.post('/api/login', { userName, password });

      setCookie('accessToken', data);
      dispatch(loginSuccess());
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loginFailure(error));
      }
    }
  };

const deleteUserAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(deleteUserRequest());
  try {
    await axios.delete('/api/customers/me', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });

    deleteCookie('accessToken');
    dispatch(deleteUserSuccess());
  } catch (error) {
    if (error instanceof Error) {
      dispatch(deleteUserFailure(error));
    }
  }
};

const changePasswordAPI =
  (password: string, onSuccess?: () => void): any =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(changePasswordRequest());
    const { userName } = getState().user;
    try {
      await axios.put(
        '/api/customers/me',
        { userName, password },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      );
      dispatch(changePasswordSuccess());
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(changePasswordFailure(error));
      }
    }
  };

const signupAPI =
  (userName: string, password: string, onSuccess?: () => void): any =>
  async (dispatch: AppDispatch) => {
    dispatch(signupRequest());
    try {
      await axios.post('/api/customers', { userName, password });
      dispatch(signupSuccess());
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signupFailure(error));
      }
    }
  };

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOAD_USER_SUCCESS: {
      const { userName } = action.payload;

      return { ...state, loading: false, userName };
    }
    case LOAD_USER_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case LOGIN_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loading: false, isLoggedIn: true };
    }
    case LOGIN_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error, isLoggedIn: false };
    }
    case LOGOUT: {
      return { ...state, isLoggedIn: false, userName: null };
    }
    case DELETE_USER_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case DELETE_USER_SUCCESS: {
      return { ...state, loading: false, isLoggedIn: false, userName: false };
    }
    case DELETE_USER_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case CHANGE_PASSWORD_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return { ...state, loading: false };
    }
    case CHANGE_PASSWORD_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case SIGNUP_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, loading: false };
    }
    case SIGNUP_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    default:
      return state;
  }
};

export const selectUserState = (state: RootState) => state.user;

export { loginAPI, loadUserAPI, logout, deleteUserAPI, changePasswordAPI, signupAPI };

export default userReducer;
