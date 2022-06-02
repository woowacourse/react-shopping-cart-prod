import { useState } from 'react';

type Validate = (value: string) => void;

const useInput = (
  validate?: Validate
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, string] => {
  const [value, setValue] = useState('');
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/ /, ''));
  };

  try {
    validate && validate(value);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [value, onChangeInputValue, error.message];
    }
  }

  return [value, onChangeInputValue, ''];
};

export default useInput;
