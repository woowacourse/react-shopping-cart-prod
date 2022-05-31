import React, { useState } from 'react';

type onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

const useInput = (): [string, onChangeFunc] => {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, onChange];
};

export default useInput;
