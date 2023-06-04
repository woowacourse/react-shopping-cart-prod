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
  $color: string;
};

const Dot = styled.div<DotProps>`
  width: 0.4em;
  height: 0.4em;
  background: ${(props) => props.$color};
  border-radius: 50%;

  animation: ${DotAnimation} 0.4s;
  animation-delay: ${(props) => props.$index * 0.15}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

type SpinnerProps = {
  color?: 'currentColor' | string;
};

const Spinner = (props: SpinnerProps) => {
  const { color = '#333333' } = props;

  return (
    <SpinnerContainer>
      <Dot $index={0} $color={color} />
      <Dot $index={1} $color={color} />
      <Dot $index={2} $color={color} />
    </SpinnerContainer>
  );
};

export default Spinner;
