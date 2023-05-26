import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { toastState } from '../../states/toast/atom';

interface ToastStyleProps {
  variant: 'success' | 'error';
}

const Toast = () => {
  const toastInfo = useRecoilValue(toastState);
  const resetToastState = useResetRecoilState(toastState);

  useEffect(() => {
    if (toastInfo === null) return;

    const closeTimeout = setTimeout(() => {
      resetToastState();
      clearTimeout(closeTimeout);
    }, toastInfo.duration);

    return () => {
      clearTimeout(closeTimeout);
    };
  }, [resetToastState, toastInfo]);

  if (toastInfo === null) return null;

  return <Container variant={toastInfo.variant}>{toastInfo.message}</Container>;
};

const toastStyle = {
  success: css`
    border: 3px solid green;
    color: green;
  `,
  error: css`
    border: 3px solid red;
    color: red;
  `,
};

const Container = styled.div<ToastStyleProps>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 12px;

  height: 48px;
  width: 50%;

  margin: 0 auto;

  border-radius: 8px;
  ${({ variant }) => toastStyle[variant]}
  background-color: #ffffff;
  line-height: 48px;
  text-align: center;

  animation: 0.3s slideUp;

  @keyframes slideUp {
    from {
      bottom: -300px;
    }

    to {
      bottom: 12px;
    }
  }
`;

export default Toast;
