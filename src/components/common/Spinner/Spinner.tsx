import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Size = {
  sm: 18,
  m: 24,
  lg: 36,
};

// const SpinnerContainer = styled.div`
//   /* display: flex;
//   justify-content: center;

//   height: fit-content;
//   background-color: red; */
// `;

const SpinnerContainer = styled.div<SpinnerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 4px solid var(--grey-200);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: ${(props) => Size[props.size]}px;
  height: ${(props) => Size[props.size]}px;
  animation: ${spinAnimation} 1s linear infinite;
`;

interface SpinnerProps {
  size: 'sm' | 'm' | 'lg';
}

export const Spinner = ({ size }: SpinnerProps) => {
  return <SpinnerContainer size={size} />;
};
