import type { Dispatch } from 'redux';
import { UserAction, UserActionType } from 'redux/actions/user';
import axios from 'axios';
import { LOCAL_BASE_URL } from 'apis';
import { SignUpInfo, SignInInfo, UserInfo, EditPasswordInfo } from 'types/domain';

export const signUp = (signUpInfo: SignUpInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.POST_SIGN_UP_START });

  try {
    const response = await axios({
      method: 'post',
      url: `${LOCAL_BASE_URL}/users`,
      data: signUpInfo,
    });

    dispatch({ type: UserActionType.POST_SIGN_UP_SUCCESS });
  } catch (e) {
    dispatch({ type: UserActionType.POST_SIGN_UP_FAILURE, payload: e.message });
  }
};

export const signIn = (signInInfo: SignInInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.POST_SIGN_IN_START });

  try {
    const response = await axios({
      method: 'post',
      url: `${LOCAL_BASE_URL}/login`,
      data: signInInfo,
    });

    localStorage.setItem('token', response.data.token);

    dispatch({ type: UserActionType.POST_SIGN_IN_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: UserActionType.POST_SIGN_IN_FAILURE, payload: e.message });
    alert(e.response.data.errorMessage);
  }
};

export const editPassword =
  (editPasswordInfo: EditPasswordInfo) => async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionType.PATCH_NEW_PASSWORD_START });

    try {
      const response = await axios({
        method: 'patch',
        url: `${LOCAL_BASE_URL}/users/me`,
        data: editPasswordInfo,
      });

      dispatch({ type: UserActionType.PATCH_NEW_PASSWORD_SUCCESS });
    } catch (e) {
      dispatch({ type: UserActionType.PATCH_NEW_PASSWORD_FAILURE, payload: e.message });
      alert(e.response.data.errorMessage);
    }
  };

/*
export const editProfile = (editInfo: UserInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.PATCH_USER_INFO_START });

  try {
    const response = await axios({
      method: 'patch',
      url: `${LOCAL_BASE_URL}/users/me`,
      data: editInfo,
    });

    localStorage.setItem('token', response.data.token);

    dispatch({ type: UserActionType.PATCH_USER_INFO_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: UserActionType.PATCH_USER_INFO_FAILURE, payload: e.message });
    alert(e.response.data.errorMessage);
  }
};*/
