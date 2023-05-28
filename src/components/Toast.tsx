import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { toastState } from "../recoil/atom";

export default function Toast() {
  const { isShown, message, type } = useRecoilValue(toastState);

  const root = document.querySelector("#root") as HTMLElement;
  return ReactDOM.createPortal(
    isShown && <Wrapper $type={type}>✅ {message}</Wrapper>,
    root
  );
}

const toastAnimaitonCycle = keyframes`
  0% {
    transform: translate(-50%, -80%);
    opacity: 0;
  }

  50% {
    transform: translate(-50%, -40%);
    opacity: 0.5;
  }

  100%{
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const Wrapper = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  align-self: center;

  width: 300px;
  height: 45px;
  border-radius: 5px;

  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%);

  padding: 0 10px;
  border: 1px solid var(--mintish-green);

  background: #def5f1;
  color: var(--dark-gray);
  font-weight: 600;

  animation: ${toastAnimaitonCycle} 0.5s linear;
  box-shadow: 0 10px 10px -3px var(--shadow-gray);
`;
