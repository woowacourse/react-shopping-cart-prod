import { useState } from 'react';

import {
  isValidPasswordAllCharacters,
  isValidPasswordLength,
} from 'utils/validator';

import useInput from './useInput';

const usePasswordInput = (initialValue: string) => {
  const { value: password, setValue: setPassword } = useInput(initialValue);
  const [isPasswordLengthCorrect, setIsPasswordLengthCorrect] = useState(false);
  const [isPasswordAllCharactersCorrect, setIsPasswordAllCharactersCorrect] =
    useState(false);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e);

    setIsPasswordLengthCorrect(isValidPasswordLength(e.target.value));
    setIsPasswordAllCharactersCorrect(
      isValidPasswordAllCharacters(e.target.value)
    );
  };

  return {
    password,
    setPassword: handler,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
  };
};

export default usePasswordInput;
