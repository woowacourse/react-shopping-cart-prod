import { useState } from 'react';

const useInputValidate = ({
  validation,
  validationAsync,
  errorMsg,
  successMsg,
}) => {
  const [validResult, setValidResult] = useState({
    isValid: false,
    text: '',
  });

  const handleBlur = (args) => async (e) => {
    const value = e.target.value;
    const isValid = args ? validation(args, value) : validation(value);

    if (isValid && typeof validationAsync === 'function') {
      try {
        await validationAsync(value);

        setValidResult({
          isValid,
          text: successMsg,
        });
      } catch (err) {
        setValidResult({
          isValid: false,
          text: err.message,
        });
      }

      return;
    }

    setValidResult({
      isValid,
      text: isValid ? successMsg : errorMsg,
    });
  };

  return { isValid: validResult.isValid, handleBlur, text: validResult.text };
};

export default useInputValidate;
