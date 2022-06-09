import { requestUserInfo } from 'api';
import { 알림_메시지 } from 'constants/';
import { snackbar } from './snackbar';
import { 유저_액션 } from './types';

const setAccessToken = (response) => async () => {
  const { accessToken } = response.content;
  sessionStorage.setItem('accessToken', accessToken);
};

const setUserData = (response) => async (dispatch) => {
  const {
    content: { username },
  } = response;
  sessionStorage.setItem('userId', username);

  dispatch({
    type: 유저_액션.SET_USER_DATA,
    payload: response.content,
  });
};

const removeUserData = () => (dispatch) => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('userId');

  dispatch({
    type: 유저_액션.REMOVE_USER_DATA,
  });
};

const withDrawUserSuccess = () => (navigate) => (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.회원_탈퇴_성공));
  dispatch(removeUserData());
  navigate('/');
};

const withDrawUserFailure = () => (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.회원_탈퇴_실패));
};

const userUnfilledLoginForm = () => async (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.불완전한_로그인_입력));
};

const userLoginSuccess = (response) => (navigate) => async (dispatch) => {
  dispatch(setAccessToken(response));
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.로그인_성공));

  const infoResponse = await requestUserInfo();

  dispatch(setUserData(infoResponse));

  navigate('/');
};

const userLoginFailure = () => async (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.로그인_실패));
};

const editUserInfoSuccess = () => (navigate) => (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.회원_정보_수정_성공));
  navigate('/');
};

const editUserInfoFailure = () => (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.회원_정보_수정_실패));
};

const editUserPasswordSuccess = () => (navigate) => (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.비밀번호_수정_성공));
  navigate('/');
};

const editUserPasswordFailure = () => (dispatch) => {
  dispatch(snackbar.pushMessageSnackbar(알림_메시지.비밀번호_수정_실패));
};

export {
  setAccessToken,
  setUserData,
  removeUserData,
  withDrawUserSuccess,
  withDrawUserFailure,
  userUnfilledLoginForm,
  userLoginSuccess,
  userLoginFailure,
  editUserInfoSuccess,
  editUserInfoFailure,
  editUserPasswordSuccess,
  editUserPasswordFailure,
};
