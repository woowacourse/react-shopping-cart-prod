import { keyframes, styled } from 'styled-components';

const DotAnimation = keyframes`
  50% {
    transform: scale(1);
  }

  to {
    transform: scale(2);
  }
`;

const SpinnerContainer = styled.div`
  display: inline-flex;
  gap: 0.5em;
  padding: 0 0.5em;
  vertical-align: middle;
`;

type DotProps = {
  $index: number;
};

const Dot = styled.div<DotProps>`
  width: 0.4em;
  height: 0.4em;
  background: #333333;
  border-radius: 50%;

  animation: ${DotAnimation} 0.4s;
  animation-delay: ${(props) => props.$index * 0.15}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Dot $index={0} />
      <Dot $index={1} />
      <Dot $index={2} />
    </SpinnerContainer>
  );
};

export default Spinner;
