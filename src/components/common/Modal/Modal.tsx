import React, { useState } from 'react';
import { styled } from 'styled-components';

interface ModalProps extends React.PropsWithChildren {
  trigger: React.ReactElement;
  title?: string;
}

const Modal = ({ trigger, title, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleOpenModal })}
      {isModalOpen && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Header>
              {title}
              <CloseButton onClick={handleCloseModal} />
            </Header>
            <Main>{children}</Main>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  width: 400px;
  height: 600px;

  background-color: white;
  border-radius: 10px;

  color: black;

  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60px;

  font-size: 18px;
  font-weight: 700;

  border-bottom: 1px solid lightgray;
`;

const Main = styled.div`
  height: 100%;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;

  width: 40px;
  height: 40px;

  border: none;
  background-color: white;

  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;

    width: 2px;
    height: 50%;

    background-color: black;
    transform-origin: center;
  }

  &::before {
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }

  &::after {
    transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  }
`;

export default Modal;
