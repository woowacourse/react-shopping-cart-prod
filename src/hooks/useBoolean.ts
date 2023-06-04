import { useState } from 'react';

const useBoolean = (initialState: boolean) => {
  const [boolean, setBoolean] = useState(initialState);

  const switchTrue = () => {
    setBoolean(true);
  };

  const switchFalse = () => {
    setBoolean(false);
  };

  return [boolean, switchTrue, switchFalse] as const;
};

export default useBoolean;
