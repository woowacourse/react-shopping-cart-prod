import styled, { keyframes } from 'styled-components';
import { ToastInfoType } from '../../../types';

const toastAnim = keyframes`
  0% {
    transform: translate(-50%, 20px);
    opacity: 0;
  }

  8% {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  100%{
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

export const Wrapper = styled.div<{ type: ToastInfoType['type'] }>`
  animation: ${toastAnim} 2s linear;
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
  height: 44px;
  border-radius: 4px;

  background-color: ${({ type }) =>
    ({
      info: 'rgb(4, 192, 158)',
      warning: 'rgb(245, 213, 96)',
      error: 'rgb(222,96,96)',
    }[type])};

  font-size: 16px;
  font-weight: 600;
  color: white;
`;
