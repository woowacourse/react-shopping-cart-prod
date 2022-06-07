import type { Dispatch } from 'redux';
import { userAction, UserAction } from 'redux/actions/user';
import axios from 'axios';
import { LOCAL_BASE_URL } from 'apis';
import { SignUpInfo, SignInInfo, EditPasswordInfo } from 'types/domain';
import { getLocalStorageToken, setLocalStorageToken } from 'utils/localStorage';

export const signUp = (signUpInfo: SignUpInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.postSignUp.pending());

  try {
    await axios({
      method: 'post',
      url: `${LOCAL_BASE_URL}/users`,
      data: signUpInfo,
    });

    dispatch(userAction.postSignUp.success());
  } catch (error) {
    dispatch(userAction.postSignUp.failure(error.message));
  }
};

export const signIn = (signInInfo: SignInInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.postSignIn.pending());

  try {
    const response = await axios({
      method: 'post',
      url: `${LOCAL_BASE_URL}/login`,
      data: signInInfo,
    });

    setLocalStorageToken(response.data.token);
    dispatch(userAction.postSignIn.success(response.data));
  } catch (error) {
    dispatch(userAction.postSignIn.failure(error.message));
    alert(error.response.data.errorMessage);
  }
};

export const editPassword =
  (editPasswordInfo: EditPasswordInfo) => async (dispatch: Dispatch<UserAction>) => {
    dispatch(userAction.patchNewPassword.pending());
    const token = getLocalStorageToken();

    try {
      await axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${LOCAL_BASE_URL}/users/me`,
        data: editPasswordInfo,
      });

      dispatch(userAction.patchNewPassword.success());
    } catch (error) {
      dispatch(userAction.patchNewPassword.failure(error.message));
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

export const resign = (password: string) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.deleteUser.pending());
  const token = getLocalStorageToken();

  try {
    await axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      url: `${LOCAL_BASE_URL}/users/me`,
      data: password,
    });

    dispatch(userAction.deleteUser.success());
  } catch (error) {
    dispatch(userAction.deleteUser.failure(error.message));
    alert(error.response.data.errorMessage);
  }
};

export const autoSignIn = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userAction.autoSignIn.pending());
  const token = getLocalStorageToken();

  try {
    const response = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      url: `${LOCAL_BASE_URL}/login/auto`,
    });

    setLocalStorageToken(response.data.token);
    dispatch(userAction.autoSignIn.success(response.data));
  } catch (error) {
    dispatch(userAction.autoSignIn.failure(error.message));
    alert(error.response.data.errorMessage);
  }
};
