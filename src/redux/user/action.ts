import { ActionGroupType, ActionsType } from 'redux/types';
import { LoginResponse, UserInfo } from 'types/domain';
import { Valueof } from 'types/utilities';

import { buildThunkActionGroup } from '../utils';

export const UserThunkActionType = {
  GET_USER: 'user/GET_USER',
  LOGIN: 'user/LOGIN',
  SIGN_UP: 'user/SIGN_UP',
  EDIT: 'user/EDIT',
  DELETE: 'user/DELETE',
} as const;

const UserActionType = {
  LOGOUT: 'user/LOGOUT',
  RESET_ERROR: 'user/RESET_ERROR',
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

const editGroup = buildThunkActionGroup<UserInfo, typeof UserThunkActionType.EDIT>(
  UserThunkActionType.EDIT
);

const deleteGroup = buildThunkActionGroup<UserInfo, typeof UserThunkActionType.DELETE>(
  UserThunkActionType.DELETE
);

export const logout = () => ({
  type: UserActionType.LOGOUT,
});

export const resetError = () => ({
  type: UserActionType.RESET_ERROR,
});

export const userActions = {
  getUserGroup,
  loginGroup,
  signupGroup,
  editGroup,
  deleteGroup,
};

export type UserAction =
  | ActionsType<ActionGroupType<typeof userActions>>
  | ReturnType<typeof logout>
  | ReturnType<typeof resetError>;
