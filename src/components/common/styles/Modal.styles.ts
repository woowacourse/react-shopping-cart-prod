import styled, { css, keyframes } from 'styled-components';

const openModalTransitionAnim = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const openModalFadeInAnim = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div<{
  width: string;
  height: string;
  modalPosition: 'center' | 'bottom';
}>`
  position: fixed;
  background-color: white;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ modalPosition }) => getModalPosition(modalPosition)};
`;

const getModalPosition = (modalPosition: 'center' | 'bottom') => {
  switch (modalPosition) {
    case 'center':
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: ${openModalFadeInAnim} 0.3s ease 1;
        border-radius: 8px;
      `;
    case 'bottom':
      return css`
        bottom: 0;
        animation: ${openModalTransitionAnim} 0.3s ease 1;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      `;
  }
};
