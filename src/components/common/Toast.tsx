import type { ToastInfoType } from '../../types';

import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { toastInfoState } from '../../recoil/state';

export default function Toast() {
  const { show, message, type } = useRecoilValue(toastInfoState);

  const root = document.querySelector('#root') as HTMLElement;
  return ReactDOM.createPortal(show && <Wrapper type={type}>{message}</Wrapper>, root);
}

const toastAnim = keyframes`
0% {
  transform: translate(-50%, 20px);
  opacity: 0;
}

8% {
  transform: translate(-50%, 0);
  opacity: 1;
}

80%{
  transform: translate(-50%, 0);
  opacity: 1;
}

95% {
  transform: translate(-50%, 20px);
  opacity: 0;
}

100% {
  transform: translate(-50%, 20px);
  opacity: 0;
}
`;

const Wrapper = styled.div<{ type: ToastInfoType['type'] }>`
  animation: ${toastAnim} 1.6s linear;
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
