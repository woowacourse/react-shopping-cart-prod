import type { Dispatch } from 'redux';
import { UserAction, UserActionType } from 'redux/actions/user';
import axios from 'axios';
import { LOCAL_BASE_URL } from 'apis';
import { SignUpInfo, SignInInfo, EditPasswordInfo } from 'types/domain';

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
    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${LOCAL_BASE_URL}/users/me`,
        data: editPasswordInfo,
      });

      dispatch({ type: UserActionType.PATCH_NEW_PASSWORD_SUCCESS });
    } catch (e) {
      dispatch({ type: UserActionType.PATCH_NEW_PASSWORD_FAILURE, payload: e.message });
      alert(e.response.data.errorMessage);
    }
  };

export const resign = (password: string) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.DELETE_USER_START });
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      url: `${LOCAL_BASE_URL}/users/me`,
      data: password,
    });

    dispatch({ type: UserActionType.DELETE_USER_SUCCESS });
  } catch (e) {
    dispatch({ type: UserActionType.DELETE_USER_FAILURE, payload: e.message });
    alert(e.response.data.errorMessage);
  }
};

export const autoSignIn = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.AUTO_SIGN_IN_START });
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      url: `${LOCAL_BASE_URL}/login/auto`,
    });

    localStorage.setItem('token', response.data.token);

    dispatch({ type: UserActionType.AUTO_SIGN_IN_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: UserActionType.AUTO_SIGN_IN_FAILURE, payload: e.message });
    alert(e.response.data.errorMessage);
  }
};

/* TODO - 회원 이름 수정 api 명세 작성 후 연동
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
