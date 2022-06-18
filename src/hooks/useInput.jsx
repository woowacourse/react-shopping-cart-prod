import { useState } from "react";

const useInput = (initialValue, validator) => {
  const [state, setState] = useState(initialValue);
  const [validation, setValidation] = useState({
    isValid: true,
    errorMessage: "",
  });

  const handleChange = (value) => {
    setState(value);

    if (!validator) return;

    const { isValid, errorMessage } = validator(value);
    if (!isValid) {
      setValidation({ isValid, errorMessage });
      return;
    }
    setValidation({ isValid: true, errorMessage: "" });
  };

  return { state, handleChange, validation };
};

export default useInput;
