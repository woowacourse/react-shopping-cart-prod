import { useState } from 'react';

type Validate = (value: string) => void;

const useInput = (validate?: Validate) => {
  const [value, setValue] = useState('');

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/ /, ''));
  };

  try {
    validate && validate(value);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { value, onChangeValue, errorMessage: error.message };
    }
  }

  return { value, onChangeValue };
};

export default useInput;
