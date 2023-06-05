/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { css, keyframes, styled } from 'styled-components';
import useToast from '../../../hooks/useToast';
import { ToastItem } from '../../../types';

const Toast = ({ message, type }: ToastItem) => {
  const [isShow, setIsShow] = useState(false);
  const { resetToast } = useToast();

  useEffect(() => {
    setIsShow(true);
    const timer = setTimeout(() => {
      setIsShow(false);
      resetToast();
    }, 1500);

    clearTimeout(timer);
  }, [setIsShow]);

  return (
    <S.Toast type={type} $isShowToast={isShow}>
      {message}
    </S.Toast>
  );
};

const toastAnimation = keyframes` 
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const S = {
  Toast: styled.div<{ type: 'success' | 'error'; $isShowToast: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: calc(100vw - 70vw);
    min-width: 300px;
    height: 50px;
    left: 10%;
    bottom: 100px;
    color: #fff;
    font-size: 18px;
    background-color: ${(props) => (props.type === 'success' ? '#04c09e' : '#ea3b52')};
    border-radius: 7px;

    ${({ $isShowToast }) => {
      return $isShowToast
        ? css`
            display: flex;
            animation: ${toastAnimation} 1.5s forwards;
          `
        : css`
            display: none;
          `;
    }}
  `,
};

export default Toast;
