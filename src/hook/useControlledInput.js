import {useState} from 'react';

function useControlledInput({initialError = true, message = '', isError = () => false}) {
  const [inputValue, setInputValue] = useState('');
  const [isChanged, setIsChanged] = useState(initialError);
  const [error, setError] = useState(isChanged && true);

  const onChange = (value) => {
    setIsChanged((prevState) => true);
    setInputValue(value);
    setError(isError(value));
  };

  return [onChange, {value: inputValue, isError: error, message, isChanged}];
}

export default useControlledInput;
