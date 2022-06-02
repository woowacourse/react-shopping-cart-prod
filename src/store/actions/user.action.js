import { userActionType } from 'store/reducers/user.reducer';

import {
  sendDeleteUserRequest,
  sendLoginRequest,
  sendUpdateNicknameRequest,
} from 'api/user.api';

import { ERROR_MESSAGES } from 'constants/messages';

export const loginUserThunk = (loginData) => async (dispatch) => {
  dispatch({ type: userActionType.START });

  try {
    const nickname = await sendLoginRequest(loginData);

    dispatch({ type: userActionType.UPDATE, payload: { nickname } });
  } catch (error) {
    dispatch({ type: userActionType.FAIL });
    throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
  }
};

export const logoutUser = () => {
  window.sessionStorage.removeItem('nickname');
  window.sessionStorage.removeItem('token');

  return {
    type: userActionType.LOGOUT,
  };
};

export const updateUserNicknameThunk = (newNickname) => async (dispatch) => {
  dispatch({ type: userActionType.START });

  try {
    await sendUpdateNicknameRequest(newNickname);

    dispatch({ type: userActionType.UPDATE, payload: { nickname: newNickname } });
  } catch (error) {
    dispatch({ type: userActionType.FAIL });
    throw new Error(ERROR_MESSAGES.USER_INFO_UPDATE_FAIL);
  }
};

export const deleteUserThunk = () => async (dispatch) => {
  try {
    await sendDeleteUserRequest();

    window.sessionStorage.removeItem('nickname');
    window.sessionStorage.removeItem('token');

    dispatch({ type: userActionType.DELETE });
  } catch (error) {
    dispatch({ type: userActionType.FAIL });
    throw new Error(ERROR_MESSAGES.USER_DELETE_FAIL);
  }
};
