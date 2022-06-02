import { ChangeEvent, useState } from 'react';

interface InputState {
  name: string;
  email: string;
}

const initialInputState: InputState = {
  name: '',
  email: '',
};

const initialValidState: ValidState = {
  name: false,
  email: false,
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

      return;
    }

    setValidState(prev => ({ ...prev, email: false }));
  };

  const handleNameInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, name: value }));
    if (value) {
      setValidState(prev => ({ ...prev, name: true }));

      return;
    }
    setValidState(prev => ({ ...prev, name: false }));
  };

  return {
    inputState,
    validState,
    handleEmailInput,
    handleNameInput,
  };
};

export default useSignInput;
