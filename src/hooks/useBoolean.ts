import { useState } from 'react';

type switchTrue = () => void;
type switchFalse = () => void;

const useBoolean = (initialState: boolean): [boolean, switchTrue, switchFalse] => {
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
