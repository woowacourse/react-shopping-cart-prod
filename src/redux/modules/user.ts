import { getCookie } from '@/utils';

export type userState = {
  isLoggedIn: boolean;
};

export type Action = ReturnType<typeof loginUser> | ReturnType<typeof logoutUser>;

const initialState: userState = {
  isLoggedIn: !!getCookie('accessToken'),
};

const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

const loginUser = () => ({ type: LOGIN });
const logoutUser = () => ({ type: LOGOUT });

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
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

export { loginUser, logoutUser };

export default userReducer;
