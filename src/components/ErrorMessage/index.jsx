import React, { useState, useEffect } from 'react';

import Wrapper from './style';

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

  return <Wrapper>{error}</Wrapper>;
};

export default ErrorMessage;
