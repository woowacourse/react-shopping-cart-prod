/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./userActions";

export const defaultSignUpThunkErrorMessages = {};
export const defaultLoginThunkErrorMessages = {};
export const defaultSecessionThunkErrorMessages = {};
export const defaultDeleteCartItemsThunkErrorMessages = {};
export const defaultGetUserThunkErrorMessage = {};
export const defaultUpdateUserPasswordThunkErrorMessage = {};
export const defaultUpdateUserGeneralInfoThunkErrorMessage = {};

export const signup =
  (data, errorMessages = defaultSignUpThunkErrorMessages) =>
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

      dispatch(createAction(ACTION_TYPE.SIGNUP_FULLFILLED));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.SIGNUP_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const login =
  (data, errorMessages = defaultLoginThunkErrorMessages) =>
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

      dispatch(createAction(ACTION_TYPE.LOGIN_FULLFILLED, { accessToken }));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.LOGIN_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const secession =
  (data, errorMessages = defaultSecessionThunkErrorMessages) =>
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

      dispatch(createAction(ACTION_TYPE.SECESSION_FULLFILLED));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.SECESSION_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const getUser =
  (errorMessages = defaultGetUserThunkErrorMessage) =>
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
        createAction(ACTION_TYPE.GET_USER_FULLFILLED, {
          userData: { email, username },
        })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.GET_USER_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const updateUserPassword =
  (data, errorMessages = defaultUpdateUserPasswordThunkErrorMessage) =>
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

      dispatch(createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_FULLFILLED));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const updateUserGeneralInfo =
  (data, errorMessages = defaultUpdateUserGeneralInfoThunkErrorMessage) =>
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
        createAction(ACTION_TYPE.UPDATE_USER_GENERAL_INFO_FULLFILLED, {
          userData: { email, username: newUsername },
        })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };
