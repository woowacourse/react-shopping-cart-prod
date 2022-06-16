import type { Dispatch } from 'redux';
import { userAction, UserAction } from 'redux/actions/user';
import axios from 'axios';
import { SignUpInfo, SignInInfo, EditPasswordInfo } from 'types/domain';
import { getLocalStorageToken, setLocalStorageToken } from 'utils/localStorage';
import { BASE_URL } from 'apis';

export const signUp = (signUpInfo: SignUpInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.postSignUp.pending());

  try {
    await axios({
      method: 'post',
      url: `${BASE_URL}/users`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: signUpInfo.name,
        email: signUpInfo.email,
        password: signUpInfo.password,
      },
    });

    dispatch(userAction.postSignUp.success());
  } catch (error) {
    dispatch(userAction.postSignUp.failure(error));
    throw new Error(error);
  }
};

export const signIn = (signInInfo: SignInInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.postSignIn.pending());

  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/login`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: signInInfo.email,
        password: signInInfo.password,
      },
    });

    setLocalStorageToken(response.data.token);
    dispatch(userAction.postSignIn.success(response.data));
  } catch (error) {
    dispatch(userAction.postSignIn.failure(error));
    throw new Error(error);
  }
};

export const editPassword =
  (editPasswordInfo: EditPasswordInfo) => async (dispatch: Dispatch<UserAction>) => {
    dispatch(userAction.patchNewPassword.pending());
    const token = getLocalStorageToken();

    try {
      await axios({
        method: 'patch',
        url: `${BASE_URL}/users/me`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: editPasswordInfo,
      });

      dispatch(userAction.patchNewPassword.success());
    } catch (error) {
      dispatch(userAction.patchNewPassword.failure(error));
      throw new Error(error);
    }
  };

export const resign = (password: string) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.deleteUser.pending());
  const token = getLocalStorageToken();

  try {
    await axios({
      method: 'delete',
      url: `${BASE_URL}/users/me`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: password,
    });

    localStorage.clear();
    dispatch(userAction.deleteUser.success());
  } catch (error) {
    dispatch(userAction.deleteUser.failure(error));
    throw new Error(error);
  }
};

export const autoSignIn = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.autoSignIn.pending());
  const token = getLocalStorageToken();

  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/token/refresh`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setLocalStorageToken(response.data.token);
    dispatch(userAction.autoSignIn.success(response.data));
  } catch (error) {
    dispatch(userAction.autoSignIn.failure(error));
    throw new Error(error);
  }
};
