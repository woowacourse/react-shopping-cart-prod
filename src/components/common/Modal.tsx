import { ReactNode } from "react";
import { styled } from "styled-components";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Background></Background>
      <Main>{children}</Main>
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
`;

export default Modal;
