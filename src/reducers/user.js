import { BASE_SERVER_URL, SERVER_PATH, COOKIE_KEY } from "constants";
import { getCookie } from "util/cookie";
import {
  loginBaseServer,
  deleteUserBaseServer,
  getUserBaseServer,
} from "util/fetch";

export const USER_ACTION = {
  LOGIN: "user/LOGIN",
  LOGIN_SUCCESS: "user/LOGIN_SUCCESS",
  LOGIN_ERROR: "user/LOGIN_ERROR",

  DELETE_ACCOUNT: "user/DELETE_ACCOUNT",
  DELETE_ACCOUNT_SUCCESS: "user/DELETE_ACCOUNT_SUCCESS",
  DELETE_ACCOUNT_ERROR: "user/DELETE_ACCOUNT_ERROR",

  UPDATE_USER_INFO: "user/UPDATE_USER_INFO",
  UPDATE_USER_INFO_SUCCESS: "user/UPDATE_USER_INFO_SUCCESS",
  UPDATE_USER_INFO_ERROR: "user/UPDATE_USER_INFO_ERROR",
  GET_USER: "user/GET_USER",
  GET_USER_SUCCESS: "user/GET_USER_SUCCESS",
  GET_USER_ERROR: "user/GET_USER_ERROR",

  CLEAN_ERROR: "user/CLEAN_ERROR",

  LOGOUT: "user/LOGOUT",
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_ACTION.LOGIN });
  try {
    const response = await loginBaseServer({
      url: `${BASE_SERVER_URL}${SERVER_PATH.LOGIN}`,
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_ACTION.LOGIN_SUCCESS,
      user: {
        ...data.customer,
        username: data.customer.username,
      },
    });
    document.cookie = `${COOKIE_KEY.TOKEN}=${data.accessToken}; path=/; max-age=${data.expirationTime}`;
    document.cookie = `${COOKIE_KEY.USER_ID}=${data.customer.id}; path=/; max-age=${data.expirationTime}`;
  } catch (error) {
    dispatch({
      type: USER_ACTION.LOGIN_ERROR,
      errorMessage: error.message,
    });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: USER_ACTION.GET_USER });
  try {
    const response = await getUserBaseServer({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie(COOKIE_KEY.TOKEN)}`,
      },
      url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${getCookie(
        COOKIE_KEY.USER_ID
      )}`,
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.message) {
        throw new Error(data.message);
      }
    }
    dispatch({ type: USER_ACTION.GET_USER_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: USER_ACTION.GET_USER_ERROR,
      errorMessage: error.message,
    });
  }
};

export const deleteUser =
  (customerId, accessToken, password) => async (dispatch) => {
    dispatch({ type: USER_ACTION.DELETE_ACCOUNT });
    try {
      const response = await deleteUserBaseServer({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${customerId}`,
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message) {
          throw new Error(data.message);
        }
      }

      dispatch({
        type: USER_ACTION.DELETE_ACCOUNT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_ACTION.DELETE_ACCOUNT_ERROR,
        errorMessage: error.message,
      });
    }
  };

const initialState = {
  isLoggedIn: !!getCookie(COOKIE_KEY.TOKEN),
  isLoading: false,
  data: {
    id: 0,
    email: "",
    username: "",
  },
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION.DELETE_ACCOUNT:
    case USER_ACTION.UPDATE_USER_INFO:
    case USER_ACTION.LOGIN:
    case USER_ACTION.GET_USER:
      return {
        isLoggedIn: state.isLoggedIn,
        isLoading: true,
        data: state.data,
        errorMessage: "",
      };
    case USER_ACTION.DELETE_ACCOUNT_SUCCESS:
    case USER_ACTION.LOGOUT:
      return { ...initialState, isLoggedIn: false };
    case USER_ACTION.UPDATE_USER_INFO_SUCCESS:
      return {
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        data: {
          ...state.data,
          username: action.username,
        },
        errorMessage: "",
      };
    case USER_ACTION.GET_USER_SUCCESS:
      return {
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        data: action.data,
        errorMessage: "",
      };
    case USER_ACTION.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        isLoading: false,
        data: action.user,
        errorMessage: "",
      };
    case USER_ACTION.DELETE_ACCOUNT_ERROR:
    case USER_ACTION.UPDATE_USER_INFO_ERROR:
    case USER_ACTION.LOGIN_ERROR:
    case USER_ACTION.GET_USER_ERROR:
      return {
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        data: state.data,
        errorMessage: action.errorMessage,
      };
    case USER_ACTION.CLEAN_ERROR:
      return {
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        data: state.data,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default reducer;
