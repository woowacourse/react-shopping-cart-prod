import { generateAsyncActionGroup } from 'redux/utils';

export const USER_ACTION_TYPE = {
  POST_SIGN_UP: 'user/POST_SIGN_UP',
  POST_SIGN_IN: 'user/POST_SIGN_IN',
  PATCH_USER_INFO: 'user/PATCH_USER_INFO',
  PATCH_NEW_PASSWORD: 'user/PATCH_NEW_PASSWORD',
  DELETE_USER: 'user/DELETE_USER',
  AUTO_SIGN_IN: 'user/AUTO_SIGN_IN',
  SIGN_OUT: 'user/SIGN_OUT',
};

const postSignUp = generateAsyncActionGroup(USER_ACTION_TYPE.POST_SIGN_UP);
const postSignIn = generateAsyncActionGroup(USER_ACTION_TYPE.POST_SIGN_UP);
const patchUserInfo = generateAsyncActionGroup(USER_ACTION_TYPE.POST_SIGN_UP);
const patchNewPassword = generateAsyncActionGroup(USER_ACTION_TYPE.POST_SIGN_UP);
const deleteUser = generateAsyncActionGroup(USER_ACTION_TYPE.POST_SIGN_UP);
const autoSignIn = generateAsyncActionGroup(USER_ACTION_TYPE.POST_SIGN_UP);
const signOut = generateAsyncActionGroup(USER_ACTION_TYPE.SIGN_OUT);

export const userAction = {
  postSignUp,
  postSignIn,
  patchUserInfo,
  patchNewPassword,
  deleteUser,
  autoSignIn,
  signOut,
};

export type UserAction = ReturnType<
  typeof userAction[keyof typeof userAction][keyof typeof userAction[keyof typeof userAction]]
>;
