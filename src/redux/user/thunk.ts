import { authClient } from 'apis';
import { AxiosError } from 'axios';
import type { Dispatch } from 'redux';
import { RootState } from 'redux/rootReducer';
import { LoginRequest, LoginResponse, UserInfo, UserInfoWithPassword } from 'types/domain';

import { UserAction, userActions } from './action';

export const getUser = () => async (dispatch: Dispatch<UserAction>) => {
  const accessToken = localStorage.getItem('access-token');

  if (!accessToken) {
    return Promise.reject();
  }

  dispatch(userActions.getUserGroup.request());
  try {
    const response = await authClient.get('/customers/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return Promise.resolve(dispatch(userActions.getUserGroup.success(response.data)));
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      dispatch(userActions.getUserGroup.failure(e));

      return Promise.reject();
    }
  }
};

export const login =
  (userInfo: LoginRequest) => async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
    dispatch(userActions.loginGroup.request());
    try {
      const response = await authClient.post<LoginResponse>('/login', userInfo);
      const { accessToken } = response.data;

      localStorage.setItem('access-token', accessToken);
      dispatch(userActions.loginGroup.success(response.data));

      return getState().user.data.name;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        dispatch(userActions.loginGroup.failure(e));

        return Promise.reject();
      }
    }
  };

export const signup =
  (userInfo: UserInfoWithPassword) => async (dispatch: Dispatch<UserAction>) => {
    dispatch(userActions.signupGroup.request());
    try {
      await authClient.post<UserInfo>('/customers', userInfo);

      return Promise.resolve(dispatch(userActions.signupGroup.success()));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        dispatch(userActions.signupGroup.failure(e));

        return Promise.reject();
      }
    }
  };

export const editUserInfo =
  (userInfo: UserInfoWithPassword) => async (dispatch: Dispatch<UserAction>) => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) return;

    dispatch(userActions.editGroup.request());
    try {
      const response = await authClient.put<UserInfo>('/customers/me', userInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(userActions.editGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        dispatch(userActions.editGroup.failure(e));

        return Promise.reject();
      }
    }
  };

export const deleteUser =
  (password: { password: string }) => async (dispatch: Dispatch<UserAction>) => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) return;
    dispatch(userActions.deleteGroup.request());
    try {
      const response = await authClient.delete('/customers/me', {
        data: password,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem('access-token');

      return Promise.resolve(dispatch(userActions.deleteGroup.success(response.data)));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        dispatch(userActions.deleteGroup.failure(e));

        return Promise.reject();
      }
    }
  };
