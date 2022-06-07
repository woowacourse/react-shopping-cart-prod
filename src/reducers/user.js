import { USER_ID_KEY } from "constants";
import { BASE_SERVER_URL, SERVER_PATH, JWT_COOKIE_KEY } from "constants";
import { deleteCookie, getCookie, setCookie } from "util/cookie";
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

  GET_USER_INFO: "user/GET_USER_INFO",
  GET_USER_INFO_SUCCESS: "user/GET_USER_INFO_SUCCESS",
  GET_USER_INFO_ERROR: "user/GET_USER_INFO_ERROR",

  UPDATE_USER_INFO: "user/UPDATE_USER_INFO",
  UPDATE_USER_INFO_SUCCESS: "user/UPDATE_USER_INFO_SUCCESS",
  UPDATE_USER_INFO_ERROR: "user/UPDATE_USER_INFO_ERROR",

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

    setCookie(JWT_COOKIE_KEY, data.accessToken, data.expirationTime);
    localStorage.setItem(USER_ID_KEY, data.customer.id);
    dispatch({
      type: USER_ACTION.LOGIN_SUCCESS,
      user: {
        ...data.customer,
        username: data.customer.username,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_ACTION.LOGIN_ERROR,
      errorMessage: error.message,
    });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: USER_ACTION.GET_USER_INFO });
  try {
    const response = await getUserBaseServer({
      url: `${BASE_SERVER_URL}${
        SERVER_PATH.CUSTOMER_LIST
      }/${localStorage.getItem(USER_ID_KEY)}`,
    });

    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_ACTION.GET_USER_INFO_SUCCESS,
      user: data,
    });
  } catch (error) {
    deleteCookie(JWT_COOKIE_KEY);
    dispatch({
      type: USER_ACTION.GET_USER_INFO_ERROR,
      errorMessage: error.message,
    });
  }
};

export const deleteUser = (password) => async (dispatch) => {
  dispatch({ type: USER_ACTION.DELETE_ACCOUNT });
  try {
    const response = await deleteUserBaseServer({
      url: `${BASE_SERVER_URL}${
        SERVER_PATH.CUSTOMER_LIST
      }/${localStorage.getItem(USER_ID_KEY)}`,
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.message) {
        throw new Error(data.message);
      }
    }

    deleteCookie(JWT_COOKIE_KEY);
    localStorage.removeItem(USER_ID_KEY);
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
  isLogin: !!getCookie(JWT_COOKIE_KEY),
  isLoading: false,
  data: {
    email: "",
    username: "",
  },
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION.GET_USER_INFO:
    case USER_ACTION.DELETE_ACCOUNT:
    case USER_ACTION.UPDATE_USER_INFO:
    case USER_ACTION.LOGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case USER_ACTION.DELETE_ACCOUNT_SUCCESS:
    case USER_ACTION.LOGOUT:
      return { ...initialState, isLogin: false };
    case USER_ACTION.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          username: action.username,
        },
      };
    case USER_ACTION.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.user,
      };
    case USER_ACTION.LOGIN_SUCCESS:
      return {
        isLogin: true,
        isLoading: false,
        data: action.user,
        errorMessage: "",
      };
    case USER_ACTION.GET_USER_INFO_ERROR:
      return {
        isLogin: state.isLogin,
        isLoading: false,
        data: initialState.data,
        errorMessage: action.errorMessage,
      };
    case USER_ACTION.DELETE_ACCOUNT_ERROR:
    case USER_ACTION.UPDATE_USER_INFO_ERROR:
    case USER_ACTION.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    case USER_ACTION.CLEAN_ERROR:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default reducer;
