import styled from 'styled-components';
import Pika from 'assets/pika';

const Loading = () => {
  return (
    <StyledLoader>
      <Pika></Pika>
      <StyledP>Loding 중...</StyledP>
    </StyledLoader>
  );
};

export default Loading;

const StyledLoader = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledP = styled.p`
  margin-top: 250px;
  font-size: 50px;
`;
