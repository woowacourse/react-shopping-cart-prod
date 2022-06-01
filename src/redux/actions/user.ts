import { UserInfo } from 'types/domain';

//TODO type만 있는게 맞는지

export enum UserActionType {
  POST_SIGN_UP_START = 'user/POST_SIGN_UP_START',
  POST_SIGN_UP_SUCCESS = 'user/POST_SIGN_UP_SUCCESS',
  POST_SIGN_UP_FAILURE = 'user/POST_SIGN_UP_FAILURE',

  POST_SIGN_IN_START = 'user/POST_SIGN_IN_START',
  POST_SIGN_IN_SUCCESS = 'user/POST_SIGN_IN_SUCCESS',
  POST_SIGN_IN_FAILURE = 'user/POST_SIGN_IN_FAILURE',

  SIGN_OUT_ACTION = 'user/SIGN_OUT',
}

interface PostSignUpStart {
  type: UserActionType.POST_SIGN_UP_START;
}

interface PostSignUpSuccess {
  type: UserActionType.POST_SIGN_UP_SUCCESS;
  payload: UserInfo;
}

interface PostSignUpFailure {
  type: UserActionType.POST_SIGN_UP_FAILURE;
  payload: string;
}

interface PostSignInStart {
  type: UserActionType.POST_SIGN_IN_START;
}

interface PostSignInSuccess {
  type: UserActionType.POST_SIGN_IN_SUCCESS;
  payload: UserInfo;
}

interface PostSignInFailure {
  type: UserActionType.POST_SIGN_IN_FAILURE;
  payload: string;
}

interface SignOutAction {
  type: UserActionType.SIGN_OUT_ACTION;
}

export type UserAction =
  | PostSignUpStart
  | PostSignUpSuccess
  | PostSignUpFailure
  | PostSignInStart
  | PostSignInSuccess
  | PostSignInFailure
  | SignOutAction;
