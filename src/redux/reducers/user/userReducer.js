/* eslint-disable default-param-last */
import apiRequestState from "@redux/utils/apiRequestState";
import Fetcher from "@utils/fetcher";
import LocalStorage from "@utils/LocalStorage";

import ACTION_TYPE from "./userActions";

const initialState = {
  query: {
    signup: apiRequestState.init(),
    login: apiRequestState.init(),
    secession: apiRequestState.init(),
    getUser: apiRequestState.init(),
    updateUserPassword: apiRequestState.init(),
    updateUserGeneralInfo: apiRequestState.init(),
  },
  data: {
    isLoggedIn: false,
    email: null,
    username: null,
  },
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPE.SIGNUP_PENDING: {
      const newState = structuredClone(state);
      newState.query.signup = apiRequestState.pending();
      return newState;
    }
    case ACTION_TYPE.SIGNUP_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.signup = apiRequestState.fulfilled();
      window.location.href = "/login";
      return state;
    }
    case ACTION_TYPE.SIGNUP_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.signup = apiRequestState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.LOGIN_PENDING: {
      const newState = structuredClone(state);
      newState.query.login = apiRequestState.pending();
      return newState;
    }
    case ACTION_TYPE.LOGIN_FULFILLED: {
      const newState = structuredClone(state);
      const { accessToken } = payload;

      LocalStorage.setItem("accessToken", accessToken);
      Fetcher.updateAccessToken(accessToken);
      newState.query.login = apiRequestState.fulfilled();
      newState.data.isLoggedIn = true;

      window.location.href = "/";
      return state;
    }
    case ACTION_TYPE.LOGIN_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.login = apiRequestState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.LOGOUT: {
      const newState = structuredClone(state);
      newState.query.login = apiRequestState.init();
      return newState;
    }

    case ACTION_TYPE.SECESSION_PENDING: {
      const newState = structuredClone(state);
      newState.query.secession = apiRequestState.pending();
      return newState;
    }
    case ACTION_TYPE.SECESSION_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.secession = apiRequestState.fulfilled();
      newState.data = structuredClone(initialstate.userReducer.data);

      LocalStorage.removeItem("accessToken");
      alert("Good Bye!");
      window.location.href = "/";
      return state; // Todo : 정석이 아님
    }
    case ACTION_TYPE.SECESSION_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.secession = apiRequestState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.GET_USER_PENDING: {
      const newState = structuredClone(state);
      newState.query.getUser = apiRequestState.pending();
      return newState;
    }
    case ACTION_TYPE.GET_USER_FULFILLED: {
      const newState = structuredClone(state);
      const { userData } = payload;
      newState.data = { ...userData, isLoggedIn: true };
      newState.query.getUser = apiRequestState.fulfilled();
      return newState;
    }
    case ACTION_TYPE.GET_USER_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.getUser = apiRequestState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.UPDATE_USER_PASSWORD_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateUserPassword = apiRequestState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_PASSWORD_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.updateUserPassword = apiRequestState.fulfilled();
      newState.data = structuredClone(initialstate.userReducer.data);
      LocalStorage.removeItem("accessToken");
      alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
      window.location.href = "/login";
      return state; // Todo : 정석이 아님
    }
    case ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.updateUserPassword = apiRequestState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateUserGeneralInfo = apiRequestState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_FULFILLED: {
      const newState = structuredClone(state);
      const { userData } = payload;
      newState.query.updateUserGeneralInfo = apiRequestState.fulfilled();
      newState.data = { ...newState.data, ...userData };
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.updateUserGeneralInfo = apiRequestState.rejected(error);
      return newState;
    }

    default: {
      return state;
    }
  }
}

export default userReducer;
