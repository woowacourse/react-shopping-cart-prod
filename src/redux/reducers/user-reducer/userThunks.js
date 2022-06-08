/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./userActions";

export const defaultSignUpThunkErrorMessages = {
  1001: "이미 존재하는 이메일입니다.",
  4001: "이메일 형식이 올바르지 않습니다.",
  4002: "비밀번호 형식이 올바르지 않습니다.",
  4003: "이름은 1~10자 이내로 입력 가능합니다.",
};

export const defaultLoginThunkErrorMessages = {
  2001: "이메일 또는 패스워드가 올바르지 않습니다.",
  4001: "이메일 형식이 올바르지 않습니다.",
};

export const defaultSecessionThunkErrorMessages = {
  3001: "기존 패스워드가 일치하지 않습니다.",
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
};

export const defaultGetUserThunkErrorMessage = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
  6004: "존재하지 않는 회원입니다.",
};

export const defaultUpdateUserGeneralInfoThunkErrorMessage = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
  4003: "이름은 1~10자 이내로 입력 가능합니다.",
};

export const defaultUpdateUserPasswordThunkErrorMessage = {
  3001: "기존 패스워드가 일치하지 않습니다.",
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
  4002: "비밀번호 형식이 올바르지 않습니다.",
};

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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
