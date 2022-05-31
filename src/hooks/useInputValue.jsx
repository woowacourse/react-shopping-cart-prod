import { useMemo, useState } from 'react';

const useInputValue = (pattern) => {
  const [inputValue, setInputValue] = useState('');

  const isValid = useMemo(
    () => inputValue === '' || pattern.test(inputValue),
    [inputValue],
  );

  return [inputValue, setInputValue, isValid];
};

export default useInputValue;
