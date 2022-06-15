import Button from 'components/common/Button';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

import { FallbackProps } from './ErrorBoundary';

const ErrorFallback = ({ message, resetErrorBoundary }: FallbackProps) => {
  return (
    <StyledRoot>
      {message || (
        <>
          <p>죄송합니다.</p>
          <p>잠시 후 다시 요청해주세요.</p>
        </>
      )}

      <Button
        type='button'
        width='40rem'
        height='8rem'
        fontSize='3.2rem'
        backgroundColor='primary'
        color='white'
        onClick={resetErrorBoundary}
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
  ${flexCenter}
  flex-direction: column;
`;
