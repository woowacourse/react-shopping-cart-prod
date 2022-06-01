import { ActionGroupType, ActionsType } from 'redux/types';
import { LoginResponse, UserInfo } from 'types/domain';
import { Valueof } from 'types/utilities';

import { buildThunkActionGroup } from '../utils';

export const UserActionType = {
  GET_USER: 'user/GET_USER',
  LOGIN: 'user/LOGIN',
  SIGN_UP: 'user/SIGN_UP',
} as const;

const getUserGroup = buildThunkActionGroup<UserInfo, typeof UserActionType.GET_USER>(
  UserActionType.GET_USER
);

const loginGroup = buildThunkActionGroup<LoginResponse, typeof UserActionType.LOGIN>(
  UserActionType.LOGIN
);

const signupGroup = buildThunkActionGroup<null, typeof UserActionType.SIGN_UP>(
  UserActionType.SIGN_UP
);

export const userActions = {
  getUserGroup,
  loginGroup,
  signupGroup,
};

export type UserAction = ActionsType<ActionGroupType<typeof userActions>>;
