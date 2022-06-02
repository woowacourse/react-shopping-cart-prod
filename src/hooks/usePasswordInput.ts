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
    if (value) {
      setPasswordValid(prevState => ({ ...prevState, prev: true }));

      return;
    }
    setPasswordValid(prevState => ({ ...prevState, prev: false }));
  };

  const handleCurrentPasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value)) {
      setPasswordValid(prevState => ({ ...prevState, current: true }));

      return;
    }

    setPasswordValid(prevState => ({ ...prevState, current: false }));
  };

  const handleCurrentPasswordConfirmInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (currentPasswordRef.current.value === value) {
      setPasswordValid(prevState => ({ ...prevState, confirm: true }));

      return;
    }
    setPasswordValid(prevState => ({ ...prevState, confirm: false }));
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
