import styled from 'styled-components';

import useToast from '../../hooks/useToast';
import { ToastStyleProps, toastStyle } from '../../styles/component';

const Toast = () => {
  const toastInfo = useToast();

  if (toastInfo === null) return null;

  return <Container variant={toastInfo.variant}>{toastInfo.message}</Container>;
};

const Container = styled.div<ToastStyleProps>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 12px;

  height: 48px;
  width: 80%;

  margin: 0 auto;

  border-radius: 4px;
  ${({ variant }) => toastStyle[variant]}
  background-color: ${({ theme }) => theme.colors.white};
  line-height: 44px;
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

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    width: 50%;
  }
`;

export default Toast;
