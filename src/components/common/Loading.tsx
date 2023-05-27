import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <StyledLoading />
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

const StyledLoading = styled.div`
  margin: 0 8px;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #333;
  animation: ${spinnerAnimation} 1s linear infinite;
`;

export default Loading;
