import { initialState } from "@redux/constants";
import queryState from "@redux/utils/queryState";
import Fetcher from "@utils/fetcher";
import LocalStorage from "@utils/LocalStorage";

import ACTION_TYPE from "./userActions";

function userReducer(state, { type, payload }) {
  switch (type) {
    case ACTION_TYPE.SIGNUP_PENDING: {
      const newState = structuredClone(state);
      newState.query.signup = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.SIGNUP_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.signup = queryState.fulfilled();
      window.location.href = "/login";
      return state;
    }
    case ACTION_TYPE.SIGNUP_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.signup = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.LOGIN_PENDING: {
      const newState = structuredClone(state);
      newState.query.login = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.LOGIN_FULFILLED: {
      const newState = structuredClone(state);
      const { accessToken } = payload;

      LocalStorage.setItem("accessToken", accessToken);
      Fetcher.updateAccessToken(accessToken);
      newState.query.login = queryState.fulfilled();
      newState.data.isLoggedIn = true;

      window.location.href = "/";
      return state;
    }
    case ACTION_TYPE.LOGIN_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.login = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.LOGOUT: {
      const newState = structuredClone(state);
      newState.query.login = queryState.init();
      return newState;
    }

    case ACTION_TYPE.SECESSION_PENDING: {
      const newState = structuredClone(state);
      newState.query.secession = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.SECESSION_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.secession = queryState.fulfilled();
      newState.data = structuredClone(initialState.user.data);

      LocalStorage.removeItem("accessToken");
      alert("Good Bye!");
      window.location.href = "/";
      return state; // Todo : 정석이 아님
    }
    case ACTION_TYPE.SECESSION_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.secession = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.GET_USER_PENDING: {
      const newState = structuredClone(state);
      newState.query.getUser = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.GET_USER_FULFILLED: {
      const newState = structuredClone(state);
      const { userData } = payload;
      newState.data = { ...userData, isLoggedIn: true };
      newState.query.getUser = queryState.fulfilled();
      return newState;
    }
    case ACTION_TYPE.GET_USER_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.getUser = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.UPDATE_USER_PASSWORD_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateUserPassword = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_PASSWORD_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.updateUserPassword = queryState.fulfilled();
      newState.data = structuredClone(initialState.user.data);
      LocalStorage.removeItem("accessToken");
      alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
      window.location.href = "/login";
      return state; // Todo : 정석이 아님
    }
    case ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.updateUserPassword = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateUserGeneralInfo = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_FULFILLED: {
      const newState = structuredClone(state);
      const { userData } = payload;
      newState.query.updateUserGeneralInfo = queryState.fulfilled();
      newState.data = { ...newState.data, ...userData };
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.updateUserGeneralInfo = queryState.rejected(error);
      return newState;
    }

    default: {
      return state;
    }
  }
}

export default userReducer;
