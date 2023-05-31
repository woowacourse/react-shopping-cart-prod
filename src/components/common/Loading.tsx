import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  width?: number;
  height?: number;
}

export const Loading = ({ width, height }: LoadingProps) => {
  return (
    <Container>
      <StyledLoading $width={width} $height={height} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoading = styled.div<{ $width?: number; $height?: number }>`
  margin: 0 8px;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$width ? `${props.$width}px` : `30px`)};
  height: ${(props) => (props.$height ? `${props.$height}px` : `30px`)};
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #333;
  animation: ${spinnerAnimation} 1s linear infinite;
`;
