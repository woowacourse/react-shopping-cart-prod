export type CustomerState = {
  isLoggedIn: boolean;
};

export type Action = ReturnType<typeof login> | ReturnType<typeof logout>;

const initialState: CustomerState = {
  isLoggedIn: false,
};

const LOGIN = 'customer/LOGIN' as const;
const LOGOUT = 'customer/LOGOUT' as const;

const login = () => ({ type: LOGIN });
const logout = () => ({ type: LOGOUT });

const customerReducer = (state = initialState, action: Action) => {
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

export default customerReducer;
