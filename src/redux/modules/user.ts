import axios from 'axios';
import { AppDispatch, RootState } from 'redux/store';
import { getCookie } from 'utils';

export type UserState = {
  userName: string | null;
  loading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
};

export type Action =
  | ReturnType<typeof loadUserRequest>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserFailure>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>;

const initialState: UserState = {
  userName: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const LOAD_USER_REQUEST = 'user/LOAD_REQUEST' as const;
const LOAD_USER_SUCCESS = 'user/LOAD_SUCCESS' as const;
const LOAD_USER_FAILURE = 'user/LOAD_FAILURE' as const;

const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

const loadUserRequest = () => ({ type: LOAD_USER_REQUEST });
const loadUserSuccess = (userName: string) => ({
  type: LOAD_USER_SUCCESS,
  payload: { userName },
});
const loadUserFailure = (error: Error) => ({
  type: LOAD_USER_FAILURE,
  payload: { error },
});

const login = () => ({ type: LOGIN });
const logout = () => ({ type: LOGOUT });

export const loadUserAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadUserRequest());
  try {
    const { data: userName } = await axios.get('/api/customers/me', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    dispatch(loadUserSuccess(userName));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadUserFailure(error));
    }
  }
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case LOAD_USER_SUCCESS: {
      const { userName } = action.payload;

      return { ...state, loading: false, userName };
    }
    case LOAD_USER_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case LOGIN: {
      return { ...state, isLoggedIn: true };
    }
    case LOGOUT: {
      return { ...state, isLoggedIn: false };
    }
    default:
      return state;
  }
};

export const selectUserState = (state: RootState) => state.user;

export { login, logout };

export default userReducer;
