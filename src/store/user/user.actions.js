import axios from 'axios';

import {
  validLoginInfo,
  validPasswordInfo,
  validSignUpInfo,
  validUserInfo,
} from '../../utils/validations';
import handleErrorLog from '../../utils/error';

import { MESSAGE, SERVER_PATH } from '../../constants';

const actionTypes = {
  ADD_TOKEN: 'ADD_TOKEN',
  ADD_TOKEN_SUCCESS: 'ADD_TOKEN_SUCCESS',
  ADD_TOKEN_ERROR: 'ADD_TOKEN_ERROR',

  DELETE_TOKEN: 'DELETE_TOKEN',
  DELETE_TOKEN_SUCCESS: 'DELETE_TOKEN_SUCCESS',
  DELETE_TOKEN_ERROR: 'DELETE_TOKEN_ERROR',

  KEEP_TOKEN: 'KEEP_TOKEN',
  KEEP_TOKEN_SUCCESS: 'KEEP_TOKEN_SUCCESS',
  KEEP_TOKEN_ERROR: 'KEEP_TOKEN_ERROR',
};

const userLoginAsync = (loginInfo) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_TOKEN });
    const { email, password } = loginInfo;
    validLoginInfo(email);
    const { data } = await axios.post(SERVER_PATH.LOGIN, { email, password });
    const { accessToken } = data;
    dispatch({ type: actionTypes.ADD_TOKEN_SUCCESS, accessToken });
    alert(MESSAGE.LOGIN_SUCCESS);
  } catch (error) {
    handleErrorLog(error);
    dispatch({ type: actionTypes.ADD_TOKEN_ERROR });
    alert(error.response.data.message);
  }
};

const userSignUpAsync = (signUpInfo) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.KEEP_TOKEN });
    const { email, nickname, password } = signUpInfo;
    validSignUpInfo(signUpInfo);
    await axios.post(SERVER_PATH.USER, { email, nickname, password });
    dispatch({ type: actionTypes.KEEP_TOKEN_SUCCESS });
    alert(MESSAGE.SIGN_UP_SUCCESS);
  } catch (error) {
    handleErrorLog(error);
    dispatch({ type: actionTypes.KEEP_TOKEN_ERROR });
    alert(error.response.data.message);
  }
};

const userModifyPasswordAsync = (password, accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_TOKEN });
    const { prevPassword, newPassword } = password;
    validPasswordInfo(password);
    await axios.patch(
      SERVER_PATH.PASSWORD,
      { prevPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch({ type: actionTypes.DELETE_TOKEN_SUCCESS });
    alert(MESSAGE.MODIFY_PASSWORD_SUCCESS);
  } catch (error) {
    handleErrorLog(error);
    dispatch({ type: actionTypes.DELETE_TOKEN_ERROR });
    alert(error.response.data.message);
  }
};

const userModifyUserInfoAsync = (userInfo, accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.KEEP_TOKEN });
    const { nickname } = userInfo;
    validUserInfo(userInfo);
    await axios.patch(
      SERVER_PATH.USER,
      { nickname },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch({ type: actionTypes.KEEP_TOKEN_SUCCESS });
    alert(MESSAGE.MODIFY_NICKNAME_SUCCESS);
  } catch (error) {
    handleErrorLog(error);
    dispatch({ type: actionTypes.KEEP_TOKEN_ERROR });
    alert(error.response.data.message);
  }
};

const userWithdrawAsync = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_TOKEN });
    await axios.delete(SERVER_PATH.USER, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({ type: actionTypes.DELETE_TOKEN_SUCCESS });
    alert(MESSAGE.WITHDRAW_SUCCESS);
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_TOKEN_ERROR });
    alert(error.response.data.message);
  }
};

export {
  actionTypes,
  userLoginAsync,
  userSignUpAsync,
  userModifyPasswordAsync,
  userModifyUserInfoAsync,
  userWithdrawAsync,
};
