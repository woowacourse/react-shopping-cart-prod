import type { Dispatch } from 'redux';
import { UserAction, UserActionType } from 'redux/actions/user';
import axios from 'axios';
import { LOCAL_BASE_URL } from 'apis';
import { SignUpInfo, SignInInfo } from 'types/domain';

export const signUp = (signUpInfo: SignUpInfo) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.POST_SIGN_UP_START });

  try {
    const response = await axios({
      method: 'post',
      url: `${LOCAL_BASE_URL}/users`,
      data: signUpInfo,
    });

    dispatch({ type: UserActionType.POST_SIGN_UP_SUCCESS, payload: response.data });
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

    dispatch({ type: UserActionType.POST_SIGN_IN_START, payload: response.data });
  } catch (e) {
    dispatch({ type: UserActionType.POST_SIGN_IN_FAILURE, payload: e.message });
  }
};
