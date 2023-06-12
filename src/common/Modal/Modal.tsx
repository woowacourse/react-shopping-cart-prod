import useModalExternal from "@common/hooks/useModalExternal";
import { Container } from "@styles/style";
import { PropsWithChildren } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

function Modal({ isOpen, closeModal, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {createPortal(
        <>
          <Background onClick={closeModal} />
          <ModalContainer>
            <Container>
              <CloseButton onClick={closeModal}>
                <AiOutlineClose size="24" />
              </CloseButton>
              {children}
            </Container>
          </ModalContainer>
        </>,
        document.body
      )}
    </>
  );
}

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 8px;
  background-color: #fff;
  padding: 2rem;
  min-width: 500px;
  overflow: hidden;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
`;
