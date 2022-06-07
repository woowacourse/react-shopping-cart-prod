import { passwordReg } from 'constants/RegExp';
import { ChangeEvent, useRef, useState } from 'react';

const usePasswordInput = () => {
  const prevPasswordRef = useRef<HTMLInputElement | null>(null);
  const currentPasswordRef = useRef<HTMLInputElement | null>(null);
  const [passwordValid, setPasswordValid] = useState({
    prev: false,
    current: false,
    confirm: false,
  });

  const handlePrevPasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPasswordValid(prevState => ({ ...prevState, prev: value ? true : false }));
  };

  const handleCurrentPasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPasswordValid(prevState => ({ ...prevState, current: passwordReg.test(value) }));
  };

  const handleCurrentPasswordConfirmInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPasswordValid(prevState => ({
      ...prevState,
      confirm: currentPasswordRef.current.value === value,
    }));
  };

  return {
    prevPasswordRef,
    currentPasswordRef,
    passwordValid,
    setPasswordValid,
    handlePrevPasswordInput,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
  };
};

export default usePasswordInput;
