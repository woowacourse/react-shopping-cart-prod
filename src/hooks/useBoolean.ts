import { useState } from 'react';

type SwitchTrue = () => void;
type SwitchFalse = () => void;

const useBoolean = (initialState: boolean): [boolean, SwitchTrue, SwitchFalse] => {
  const [boolean, setBoolean] = useState(initialState);

  const switchTrue = () => {
    setBoolean(true);
  };

  const switchFalse = () => {
    setBoolean(false);
  };

  return [boolean, switchTrue, switchFalse];
};

export default useBoolean;
