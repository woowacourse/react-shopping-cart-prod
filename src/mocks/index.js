// @ts-nocheck
import signupHandler from 'page/SignupPage/mock';
import loginHandler from 'page/LoginPage/mock';
import changeNicknameHandler from 'page/AccountPage/mock';
import changePasswordHandler from 'page/AccountPage/PasswordEditModal/mock';
import deleteAccountHandler from 'page/AccountPage/AccountDeleteModal/mock';
import userInquiryHandler from './handlers/userInquiryHandler';
import logoutHandler from './handlers/logoutHandler';

export const users = [
  { id: 1, email: '1@gmail.com', nickname: 'abc', password: 'qwer1234!!' },
  { id: 2, email: '2@gmail.com', nickname: 'def', password: '123456@adssd' },
  { id: 3, email: '3@gmail.com', nickname: 'ghi', password: '123456@adssd' },
];

const handlers = [
  // 회원가입
  signupHandler,

  // 로그인
  loginHandler,

  // 회원정보수정 / 닉네임
  changeNicknameHandler,

  // 회원정보수정 / 비밀번호
  changePasswordHandler,

  // 회원탈퇴
  deleteAccountHandler,

  // 회원조회
  userInquiryHandler,

  // 로그아웃
  logoutHandler,
];

export default handlers;
