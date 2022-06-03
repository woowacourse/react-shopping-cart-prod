import { useMemo, useState } from 'react';

const useInputValue = (pattern, initialValue = '') => {
  const [inputValue, setInputValue] = useState(initialValue);

  const isValid = useMemo(
    () => inputValue === '' || pattern?.test(inputValue),
    [inputValue],
  );

  return [inputValue, setInputValue, isValid];
};

export default useInputValue;
