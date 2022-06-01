import { ActionGroupType, ActionsType } from 'redux/types';
import { LoginResponse, UserInfo } from 'types/domain';
import { Valueof } from 'types/utilities';

import { buildThunkActionGroup } from '../utils';

export const UserThunkActionType = {
  GET_USER: 'user/GET_USER',
  LOGIN: 'user/LOGIN',
  SIGN_UP: 'user/SIGN_UP',
} as const;

const UserActionType = {
  LOGOUT: 'user/LOGOUT',
} as const;

const getUserGroup = buildThunkActionGroup<UserInfo, typeof UserThunkActionType.GET_USER>(
  UserThunkActionType.GET_USER
);

const loginGroup = buildThunkActionGroup<LoginResponse, typeof UserThunkActionType.LOGIN>(
  UserThunkActionType.LOGIN
);

const signupGroup = buildThunkActionGroup<null, typeof UserThunkActionType.SIGN_UP>(
  UserThunkActionType.SIGN_UP
);

export const logout = () => ({
  type: UserActionType.LOGOUT,
});

export const userActions = {
  getUserGroup,
  loginGroup,
  signupGroup,
};

export type UserAction =
  | ActionsType<ActionGroupType<typeof userActions>>
  | ReturnType<typeof logout>;
