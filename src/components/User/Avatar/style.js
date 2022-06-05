import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
100% {
  transform: rotate(360deg);
 }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;

  &:hover {
    animation: ${rotate} 0.8s ease forwards;
  }
`;
