export type UserState = {
  isLoggedIn: boolean;
};

export type Action = ReturnType<typeof login> | ReturnType<typeof logout>;

const initialState: UserState = {
  isLoggedIn: false,
};

const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

const login = () => ({ type: LOGIN });
const logout = () => ({ type: LOGOUT });

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

export { login, logout };

export default userReducer;
