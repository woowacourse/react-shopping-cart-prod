import { useState } from 'react';

const useErrorState = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any) => {
    setHasError(true);
    console.error('An unexpected error occurred:', error);
  };

  return { hasError, handleError };
};

export default useErrorState;
