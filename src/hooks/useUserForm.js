import { useState } from 'react';

const useUserForm = (initForm) => {
  const [state, setState] = useState(initForm);

  const handleUserInfoChange = (setState, key) => (e) => {
    setState((prevState) => {
      return { ...prevState, [key]: e.target.value };
    });
  };

  return { state, setState, handleUserInfoChange };
};

export default useUserForm;
