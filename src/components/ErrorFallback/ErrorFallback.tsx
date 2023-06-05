import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}></button>
    </div>
  );
};

export default ErrorFallback;
