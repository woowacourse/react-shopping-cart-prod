import { ChangeEvent, useState } from 'react';

const initialInputState = {
  name: '',
  email: '',
};

const initialValidState = {
  name: false,
  email: false,
};

const useSignInput = () => {
  const [inputState, setInputState] = useState(initialInputState);
  const [validState, setValidState] = useState(initialValidState);

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
