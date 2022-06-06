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
  | ReturnType<typeof leaveUserRequest>
  | ReturnType<typeof leaveUserSuccess>
  | ReturnType<typeof leaveUserFailure>;

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
const LEAVE_USER_REQUEST = 'user/LEAVE_REQUEST' as const;
const LEAVE_USER_SUCCESS = 'user/LEAVE_SUCCESS' as const;
const LEAVE_USER_FAILURE = 'user/LEAVE_FAILURE' as const;

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
const leaveUserRequest = () => ({ type: LEAVE_USER_REQUEST });
const leaveUserSuccess = () => ({ type: LEAVE_USER_SUCCESS });
const leaveUserFailure = (error: Error) => ({
  type: LEAVE_USER_FAILURE,
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
  (userName: string, password: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await axios.post('/api/login', { userName, password });

      setCookie('accessToken', data);
      dispatch(loginSuccess());
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loginFailure(error));
      }
    }
  };

const leaveUserAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(leaveUserRequest());
  try {
    await axios.delete('/api/customers/me', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });

    deleteCookie('accessToken');
    dispatch(leaveUserSuccess());
  } catch (error) {
    if (error instanceof Error) {
      dispatch(leaveUserFailure(error));
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
    case LEAVE_USER_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LEAVE_USER_SUCCESS: {
      return { ...state, loading: false, isLoggedIn: false, userName: false };
    }
    case LEAVE_USER_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    default:
      return state;
  }
};

export const selectUserState = (state: RootState) => state.user;

export { loginAPI, loadUserAPI, logout, leaveUserAPI };

export default userReducer;
