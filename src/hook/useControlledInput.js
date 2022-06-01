import {useState} from 'react';

function useControlledInput({message, isError}) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const onChange = (value) => {
    setInputValue(value);
    setError(isError(value));
  };

  return [onChange, {value: inputValue, isError: error, message}];
}

export default useControlledInput;
