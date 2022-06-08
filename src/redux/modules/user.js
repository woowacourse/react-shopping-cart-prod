import appClient from "@/utils/appClient";
import { setCookie, deleteCookie } from "@/utils/auth";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import { MESSAGE, ERROR_CODE } from "@/constants";
import { getCookie } from "@/utils/auth";

const ACTION_TYPES = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_USER: "LOGOUT_USER",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",

  GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS",
  GET_USER_INFO_FAILURE: "GET_USER_INFO_FAILURE",
};

const initialState = {
  email: "",
  nickname: "",
  authorized: false,
};

export const getUserInfo = () => async (dispatch) => {
  const headers = { Authorization: `Bearer ${getCookie("accessToken")}` };
  try {
    const { data } = await appClient.get("/users/me", { headers });
    dispatch({ type: ACTION_TYPES.GET_USER_INFO_SUCCESS, payload: data });
  } catch (error) {
    const { errorCode } = error.response.data;
    dispatch(toggleSnackbarOpen(MESSAGE[ERROR_CODE[errorCode]]));
    dispatch({
      type: ACTION_TYPES.GET_USER_INFO_FAILURE,
      payload: errorCode,
    });
  }
};

export const loginUser = (accessToken) => ({
  type: ACTION_TYPES.LOGIN_SUCCESS,
  payload: accessToken,
});

export const logoutUser = () => ({ type: ACTION_TYPES.LOGOUT_USER });

export const editUser = (nickname) => ({
  type: ACTION_TYPES.EDIT_USER_SUCCESS,
  payload: nickname,
});

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS: {
      const { accessToken } = action.payload;
      setCookie("accessToken", accessToken);
      return {
        ...state,
        authorized: true,
      };
    }
    case ACTION_TYPES.LOGOUT_USER: {
      deleteCookie("accessToken");
      return {
        ...state,
        authorized: false,
      };
    }
    case ACTION_TYPES.GET_USER_INFO_SUCCESS: {
      const { email, nickname } = action.payload;
      return {
        email,
        nickname,
        authorized: true,
      };
    }
    case ACTION_TYPES.GET_USER_INFO_FAILURE: {
      return {
        ...state,
        authorized: false,
      };
    }
    case ACTION_TYPES.EDIT_USER_SUCCESS: {
      return {
        ...state,
        nickname: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
