// @ts-nocheck
import signupHandler from 'page/SignupPage/mock';
import loginHandler from 'page/LoginPage/mock';
import changeNicknameHandler from 'page/AccountPage/mock';
import changePasswordHandler from 'page/AccountPage/PasswordEditModal/mock';
import deleteAccountHandler from 'page/AccountPage/AccountDeleteModal/mock';
import userInquiryHandler from './handlers/userInquiryHandler';

import getProductsHandler from 'page/ProductListPage/mock';
import getProductHandler from 'page/ProductDetailPage/mock';

import { getCartHandler, postOrderHandler } from 'page/CartPage/mock';
import putCartHandler from './handlers/putCartHandler';
import deleteCartProductHandler from './handlers/deleteCartProductHandler';
import getOrderHandler from 'page/PaymentPage/mock';

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

  // 상품목록조회
  getProductsHandler,

  // 단건상품조회
  getProductHandler,

  // 장바구니목록조회
  getCartHandler,

  // 장바구니담기, 상품수정
  putCartHandler,

  // 장바구니에서 특정 상품 삭제
  deleteCartProductHandler,

  // 주문하기
  postOrderHandler,

  // 주문단건조회
  getOrderHandler,
];

export default handlers;
