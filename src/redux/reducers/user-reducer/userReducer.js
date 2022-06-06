import queryState from "@redux/utils/queryState";
import LocalStorage from "@storage/localStorage";
import { initialState } from "@redux/constants";
import ACTION_TYPE from "./userActions";
import Fetcher from "../../../utils/fetcher";

function userReducer(state, { type, payload }, totalState) {
  switch (type) {
    case ACTION_TYPE.SIGNUP_PENDING: {
      const newState = structuredClone(state);
      newState.query.signup = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.SIGNUP_FULLFILLED: {
      const newState = structuredClone(state);
      newState.query.signup = queryState.fullfilled();
      return newState;
    }
    case ACTION_TYPE.SIGNUP_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.signup = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.LOGIN_PENDING: {
      const newState = structuredClone(state);
      newState.query.login = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.LOGIN_FULLFILLED: {
      const newState = structuredClone(state);
      const { accessToken } = payload;
      LocalStorage.setItem("accessToken", accessToken);
      Fetcher.updateAccessToken(accessToken);
      newState.query.login = queryState.fullfilled();
      newState.data.isLoggedIn = true;
      return newState;
    }
    case ACTION_TYPE.LOGIN_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.login = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.SECESSION_PENDING: {
      const newState = structuredClone(state);
      newState.query.secession = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.SECESSION_FULLFILLED: {
      const newState = structuredClone(state);
      LocalStorage.removeItem("accessToken");
      newState.query.secession = queryState.fullfilled();
      newState.data = structuredClone(initialState.user.data);
      return newState;
    }
    case ACTION_TYPE.SECESSION_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.secession = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.GET_USER_PENDING: {
      const newState = structuredClone(state);
      newState.query.getUser = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.GET_USER_FULLFILLED: {
      const newState = structuredClone(state);
      const { userData } = payload;
      newState.data = { ...userData, isLoggedIn: true };
      newState.query.getUser = queryState.fullfilled();
      return newState;
    }
    case ACTION_TYPE.GET_USER_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.getUser = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.UPDATE_USER_PASSWORD_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateUserPassword = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_PASSWORD_FULLFILLED: {
      const newState = structuredClone(state);
      newState.query.updateUserPassword = queryState.fullfilled();
      newState.data = structuredClone(initialState.user.data);
      // Todo - redirect
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_PASSWORD_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.updateUserPassword = queryState.rejected(error);
      return newState;
    }

    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_PENDING: {
      const newState = structuredClone(state);
      newState.query.updateUserGeneralInfo = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_FULLFILLED: {
      const newState = structuredClone(state);
      const { userData } = payload;
      newState.query.updateUserGeneralInfo = queryState.fullfilled();
      newState.data = { ...newState.data, ...userData };
      return newState;
    }
    case ACTION_TYPE.UPDATE_USER_GENERAL_INFO_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.updateUserGeneralInfo = queryState.rejected(error);
      return newState;
    }

    default: {
      return state;
    }
  }
}

export default userReducer;
