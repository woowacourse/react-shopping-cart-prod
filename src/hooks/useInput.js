import { useEffect, useState } from 'react';

const useInput = (validationFunc) => {
  const [value, setValue] = useState('');
  const [checkValue, setCheckValue] = useState(false);

  useEffect(() => {
    setCheckValue(false);
    if (validationFunc && validationFunc(value)) {
      setCheckValue(true);
    }
  }, [value, validationFunc]);

  return { value, setValue, checkValue };
};

export default useInput;
