import { emailReg } from 'constants/RegExp';
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
    setValidState(prev => ({ ...prev, email: emailReg.test(value) }));
  };

  const handleNameInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, name: value }));
    setValidState(prev => ({ ...prev, name: value ? true : false }));
  };

  return {
    inputState,
    validState,
    handleEmailInput,
    handleNameInput,
  };
};

export default useSignInput;
