/* eslint-disable no-undef */
import ApiError from "@utils/ApiError";
import Fetcher from "@utils/fetcher";

import createAction from "../../utils/createAction";
import ACTION_TYPE from "./userActions";

import ERROR_MESSAGES from "../../../constants/errorMessages";

export const signup =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.SIGNUP_PENDING));

    try {
      const { email, password, username } = data;
      const response = await Fetcher.post("customers", {
        email,
        password,
        username,
      });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      dispatch(createAction(ACTION_TYPE.SIGNUP_FULFILLED));
      window.location.href = "/login";
    } catch (e) {
      const error = {
        message: errorMessages[e.errorCode] ?? e.message,
        errorCode: e.errorCode,
      };

      dispatch(createAction(ACTION_TYPE.SIGNUP_REJECTED, { error }));
      alert(error.message);
    }
  };

export const login =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.LOGIN_PENDING));

    try {
      const { email, password } = data;
      const response = await Fetcher.post("auth/login", { email, password });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const { accessToken } = await response.json();

      dispatch(createAction(ACTION_TYPE.LOGIN_FULFILLED, { accessToken }));
      window.location.href = "/";
    } catch (e) {
      const error = {
        message: errorMessages[e.errorCode] ?? e.message,
        errorCode: e.errorCode,
      };

      dispatch(createAction(ACTION_TYPE.LOGIN_REJECTED, { error }));
      alert(error.message);
    }
  };

export const secession =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.SECESSION_PENDING));

    try {
      const { password } = data;
      const response = await Fetcher.delete("customers/me", { password });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      dispatch(createAction(ACTION_TYPE.SECESSION_FULFILLED));

      LocalStorage.removeItem("accessToken");
      alert("Good Bye!");
      window.location.href = "/";
    } catch (e) {
      const error = {
        message: errorMessages[e.errorCode] ?? e.message,
        errorCode: e.errorCode,
      };

      dispatch(createAction(ACTION_TYPE.SECESSION_REJECTED, { error }));
      alert(error.message);
    }
  };

export const getUser =
  (errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.GET_USER_PENDING));

    try {
      const response = await Fetcher.get("customers/me");
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      const { email, username } = await response.json();

      dispatch(
        createAction(ACTION_TYPE.GET_USER_FULFILLED, {
          userData: { email, username },
        })
      );
    } catch (e) {
      const error = {
        message: errorMessages[e.errorCode] ?? e.message,
        errorCode: e.errorCode,
      };

      dispatch(createAction(ACTION_TYPE.GET_USER_REJECTED, { error }));
      alert(error.message);
    }
  };

export const updateUserPassword =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_PENDING));

    try {
      const { oldPassword, newPassword } = data;
      const response = await Fetcher.patch("customers/me?target=password", {
        oldPassword,
        newPassword,
      });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      dispatch(createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_FULFILLED));

      LocalStorage.removeItem("accessToken");
      alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
      window.location.href = "/login";
    } catch (e) {
      const error = {
        message: errorMessages[e.errorCode] ?? e.message,
        errorCode: e.errorCode,
      };

      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED, { error })
      );
      alert(error.message);
    }
  };

export const updateUserGeneralInfo =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.UPDATE_USER_GENERAL_INFO_PENDING));

    try {
      const { username } = data;
      const response = await Fetcher.patch("customers/me?target=generalInfo", {
        username,
      });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const { email, username: newUsername } = await response.json();

      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_GENERAL_INFO_FULFILLED, {
          userData: { email, username: newUsername },
        })
      );
    } catch (e) {
      const error = {
        message: errorMessages[e.errorCode] ?? e.message,
        errorCode: e.errorCode,
      };

      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED, { error })
      );
      alert(error.message);
    }
  };
