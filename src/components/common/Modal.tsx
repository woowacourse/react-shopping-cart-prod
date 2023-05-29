import { KeyboardEvent, ReactNode, useEffect } from "react";
import { styled } from "styled-components";

interface ModalProps {
  children: ReactNode;
  closeEvent: () => void;
}

const Modal = ({ children, closeEvent }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      const target = e as unknown as KeyboardEvent;

      if (target.key === "Escape") {
        closeEvent();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Background onClick={closeEvent}></Background>
      <Main>
        <CloseButton onClick={closeEvent}>x</CloseButton>
        {children}
      </Main>
    </>
  );
};

const Background = styled.div`
  position: fixed;

  height: 100vh;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const Main = styled.div`
  position: fixed;

  height: 80vh;
  width: 70vw;

  background-color: white;
  z-index: 2;

  margin-left: 15vw;
  margin-top: 10vh;

  border-radius: 5px;

  padding: 5%;

  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 13vh;
  right: 18vw;

  cursor: pointer;

  height: 24px;
  width: 24px;

  border-radius: 50%;

  background-color: #333333;
  color: white;
`;

export default Modal;
