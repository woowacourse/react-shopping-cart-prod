import { ChangeEvent, useState } from 'react';

interface InputState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialInputState: InputState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const initialValidState: ValidState = {
  name: false,
  email: false,
  password: false,
  passwordConfirm: false,
};

type ValidState = {
  [key in keyof InputState]: boolean;
};

const useSignInput = () => {
  const [inputState, setInputState] = useState<InputState>(initialInputState);
  const [validState, setValidState] = useState<ValidState>(initialValidState);

  const handleEmailInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, email: value }));

    if (value) {
      setValidState(prev => ({ ...prev, email: true }));
    }
  };

  const handleNameInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, name: value }));
    if (value) {
      setValidState(prev => ({ ...prev, name: true }));
    }
  };

  const handlePasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, password: value }));

    if (/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value)) {
      setValidState(prev => ({ ...prev, password: true }));
    }
  };

  const handlePasswordConfirmInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, passwordConfirm: value }));

    if (inputState.password === value) {
      setValidState(prev => ({ ...prev, passwordConfirm: true }));
    }
  };

  const handleNewPasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, password: value }));

    if (/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value)) {
      setValidState(prev => ({ ...prev, password: true }));
    }
  };

  return {
    inputState,
    validState,
    handleEmailInput,
    handleNameInput,
    handlePasswordInput,
    handlePasswordConfirmInput,
    handleNewPasswordInput,
  };
};

export default useSignInput;
