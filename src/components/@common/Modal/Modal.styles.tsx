import styled from 'styled-components';

export const ModalContainer = styled.div<{ isModalOpened: boolean }>`
  display: ${({ isModalOpened }) => (isModalOpened ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  width: 80%;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 16px;
  background-color: #fefefe;
`;
