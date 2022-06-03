import React, { useState, useEffect } from 'react';

import ErrorWrapper from 'styles/ErrorWrapper';

const ErrorMessage = ({ validation }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      validation();
      setError('');
    } catch ({ message }) {
      setError(message);
    }
  }, [validation]);

  return (
    error && (
      <ErrorWrapper>
        <p>{error}</p>
      </ErrorWrapper>
    )
  );
};

export default ErrorMessage;
