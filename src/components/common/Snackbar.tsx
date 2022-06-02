import styled, { keyframes } from 'styled-components';
import { flexCenter } from 'styles/mixin';

import Portal from './Portal';

export const MESSAGE = {
  cart: '장바구니에 담았습니다.',
  passwordConfirm: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  password: '비밀번호가 일치하지 않습니다.',
  login: '이메일 또는 비밀번호가 일치하지 않습니다.',
  editUser: '수정된 사항이 없습니다.',
} as const;

type Message = typeof MESSAGE[keyof typeof MESSAGE];

const Snackbar = ({ message }: { message: Message }) => {
  return (
    <Portal id='snackbar'>
      <StyledSnackbarContents key={Date.now()}>{message}</StyledSnackbarContents>
    </Portal>
  );
};

export default Snackbar;

const snackbarShow = keyframes`
  0% { bottom:-7rem; opacity:0 }
  40%{ bottom:3rem; opacity:0 }
  65% { bottom:5rem; }
  80% { bottom:3rem; opacity:1 }
  100% { bottom:5rem; }
`;

const StyledSnackbarContents = styled.div`
  ${flexCenter};
  position: fixed;
  width: 50rem;
  height: 7rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  left: 50%;
  bottom: -7rem;
  transform: translateX(-50%);
  font-size: 2.5rem;

  animation-name: ${snackbarShow};
  animation-duration: 0.5s;
  animation-direction: forwards;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;
