import * as styled from './FallbackRender.styled';

interface FallbackRenderProps {
  error: {
    message: string;
  };
  resetErrorBoundary: () => void;
}

export const FallbackRender = ({ error, resetErrorBoundary }: FallbackRenderProps) => {
  return (
    <styled.FallbackRender>
      <styled.ErrorMessage>{error.message}</styled.ErrorMessage>
      <styled.RetryWrapper>
        <button onClick={resetErrorBoundary}>Retry</button>
      </styled.RetryWrapper>
    </styled.FallbackRender>
  );
};
