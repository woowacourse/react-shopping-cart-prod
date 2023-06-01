import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const Spinner = () => {
  return <SpinnerContainer />;
};
