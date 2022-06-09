import Button from 'components/common/Button';
import styled from 'styled-components';

const ErrorFallback = () => {
  return (
    <StyledRoot>
      <p>죄송합니다.</p>
      <p>잠시 후 다시 요청해주세요.</p>
      <Button
        type='button'
        width='40rem'
        height='8rem'
        fontSize='3.2rem'
        backgroundColor='primary'
        color='white'
        onClick={() => window.location.reload()}
      >
        다시 시도하기
      </Button>
    </StyledRoot>
  );
};

export default ErrorFallback;

const StyledRoot = styled.div`
  font-size: 50px;
  text-align: center;
`;
