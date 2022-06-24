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
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.SIGNUP_REJECTED, {
          error: e.toPlainObj(),
        })
      );
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
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.LOGIN_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
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
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.SECESSION_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
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
      dispatch(
        createAction(ACTION_TYPE.GET_USER_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
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
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
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
      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
