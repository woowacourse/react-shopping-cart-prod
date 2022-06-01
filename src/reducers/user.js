import { BASE_SERVER_URL, SERVER_PATH } from "constants";
import {
  registerBaseServer,
  loginBaseServer,
  deleteUserBaseServer,
  updateUserBaseServer,
} from "util/fetch";

const USER_ACTION = {
  REGISTER: "user/REGISTER",
  REGISTER_SUCCESS: "user/REGISTER_SUCCESS",
  REGISTER_ERROR: "user/REGISTER_ERROR",

  LOGIN: "user/LOGIN",
  LOGIN_SUCCESS: "user/LOGIN_SUCCESS",
  LOGIN_ERROR: "user/LOGIN_ERROR",

  DELETE_ACCOUNT: "user/DELETE_ACCOUNT",
  DELETE_ACCOUNT_SUCCESS: "user/DELETE_ACCOUNT_SUCCESS",
  DELETE_ACCOUNT_ERROR: "user/DELETE_ACCOUNT_ERROR",

  UPDATE_USER_INFO: "user/UPDATE_USER_INFO",
  UPDATE_USER_INFO_SUCCESS: "user/UPDATE_USER_INFO_SUCCESS",
  UPDATE_USER_INFO_ERROR: "user/UPDATE_USER_INFO_ERROR",
};

export const register =
  ({ email, nickname, password }) =>
  async (dispatch) => {
    dispatch({ type: USER_ACTION.REGISTER });
    try {
      const response = await registerBaseServer({
        url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}`,
        body: {
          email,
          username: nickname,
          password,
        },
      });

      const data = await response.json();
      if (data.message) {
        throw new Error(data.message);
      }

      dispatch({
        type: USER_ACTION.REGISTER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_ACTION.REGISTER_ERROR,
        errorMessage: error.message,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: USER_ACTION.LOGIN });
    try {
      const response = await loginBaseServer({
        url: `${BASE_SERVER_URL}${SERVER_PATH.LOGIN}`,
        body: {
          email,
          password,
        },
      });

      const data = await response.json();
      if (data.message) {
        throw new Error(data.message);
      }

      dispatch({
        type: USER_ACTION.LOGIN_SUCCESS,
        user: { ...data.customer, accessToken: data.accessToken },
      });
    } catch (error) {
      dispatch({
        type: USER_ACTION.LOGIN_ERROR,
        errorMessage: error.message,
      });
    }
  };

export const deleteUser = (customerId) => async (dispatch) => {
  dispatch({ type: USER_ACTION.DELETE_ACCOUNT });
  try {
    const response = await deleteUserBaseServer({
      url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${customerId}`,
    });

    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
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

export const updateUser = (customerId, nickname) => async (dispatch) => {
  dispatch({ type: USER_ACTION.UPDATE_USER_INFO });
  try {
    const response = await updateUserBaseServer({
      url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${customerId}`,
      body: { nickname },
    });

    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_ACTION.UPDATE_USER_INFO_SUCCESS,
      nickname: data.username,
    });
  } catch (error) {
    dispatch({
      type: USER_ACTION.UPDATE_USER_INFO_ERROR,
      errorMessage: error.message,
    });
  }
};

const initialState = {
  isLoading: false,
  data: {
    id: 0,
    email: "",
    nickname: "",
    accessToken: "",
  },
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION.DELETE_ACCOUNT:
    case USER_ACTION.UPDATE_USER_INFO:
    case USER_ACTION.LOGIN:
    case USER_ACTION.REGISTER:
      return {
        isLoading: true,
        data: state.data,
        errorMessage: "",
      };
    case USER_ACTION.DELETE_ACCOUNT_SUCCESS:
      return {
        isLoading: false,
        data: initialState,
        errorMessage: "",
      };
    case USER_ACTION.UPDATE_USER_INFO_SUCCESS:
      return {
        isLoading: false,
        data: {
          ...state.data,
          nickname: action.nickname,
        },
        errorMessage: "",
      };
    case USER_ACTION.LOGIN_SUCCESS:
      return {
        isLoading: false,
        data: action.user,
        errorMessage: "",
      };
    case USER_ACTION.REGISTER_SUCCESS:
      return {
        isLoading: false,
        data: state.data,
        errorMessage: "",
      };
    case USER_ACTION.DELETE_ACCOUNT_ERROR:
    case USER_ACTION.UPDATE_USER_INFO_ERROR:
      return {
        isLoading: false,
        data: state.data,
        errorMessage: action.errorMessage,
      };
    case USER_ACTION.LOGIN_ERROR:
    case USER_ACTION.REGISTER_ERROR:
      return {
        isLoading: false,
        data: initialState,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
