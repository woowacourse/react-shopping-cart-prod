import { UserInfo } from 'types/domain';

export enum UserActionType {
  POST_SIGN_UP_START = 'user/POST_SIGN_UP_START',
  POST_SIGN_UP_SUCCESS = 'user/POST_SIGN_UP_SUCCESS',
  POST_SIGN_UP_FAILURE = 'user/POST_SIGN_UP_FAILURE',

  POST_SIGN_IN_START = 'user/POST_SIGN_IN_START',
  POST_SIGN_IN_SUCCESS = 'user/POST_SIGN_IN_SUCCESS',
  POST_SIGN_IN_FAILURE = 'user/POST_SIGN_IN_FAILURE',
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

export type UserAction =
  | PostSignUpStart
  | PostSignUpSuccess
  | PostSignUpFailure
  | PostSignInStart
  | PostSignInSuccess
  | PostSignInFailure;
