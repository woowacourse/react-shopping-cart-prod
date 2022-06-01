import { authClient } from 'apis';
import type { Dispatch } from 'redux';
import { LoginRequest, LoginResponse, UserInfo, UserInfoWithPassword } from 'types/domain';

import { UserAction, userActions } from './action';

export const getUser = () => async (dispatch: Dispatch<UserAction>) => {
  const accessToken = localStorage.getItem('access-token');

  if (!accessToken) return;

  dispatch(userActions.getUserGroup.request());
  try {
    const response = await authClient.get<UserInfo>('/customers/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(userActions.getUserGroup.success(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(userActions.getUserGroup.failure(e));
    }
  }
};

export const login = (userInfo: LoginRequest) => async (dispatch: Dispatch<UserAction>) => {
  dispatch(userActions.loginGroup.request());
  try {
    const response = await authClient.post<LoginResponse | string>('/login', userInfo);

    if (typeof response.data === 'string') {
      throw new Error(response.data);
    }
    const { accessToken } = response.data;

    localStorage.setItem('access-token', accessToken);
    dispatch(userActions.loginGroup.success(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(userActions.loginGroup.failure(e));
    }
  }
};

export const signup =
  (userInfo: UserInfoWithPassword) => async (dispatch: Dispatch<UserAction>) => {
    dispatch(userActions.signupGroup.request());
    try {
      const response = await authClient.post<UserInfo | string>('/customers', userInfo);

      if (typeof response.data === 'string') {
        throw new Error(response.data);
      }

      dispatch(userActions.signupGroup.success());
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(userActions.signupGroup.failure(e));
      }
    }
  };

export const editUserInfo =
  (userInfo: UserInfoWithPassword) => async (dispatch: Dispatch<UserAction>) => {
    dispatch(userActions.editGroup.request());
    try {
      const response = await authClient.put<UserInfo | string>('/customers/me', userInfo);

      if (typeof response.data === 'string') {
        throw new Error(response.data);
      }

      dispatch(userActions.editGroup.success());
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(userActions.editGroup.failure(e));
      }
    }
  };
