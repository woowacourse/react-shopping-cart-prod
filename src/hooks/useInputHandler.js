import { useState } from "react";

export const useInputHandler = (validator, initialState) => {
  const [inputValue, setInputValue] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(initialState);

  const updateInputState = ({ target: { name, value } }) => {
    try {
      validator[name] && validator[name](value);
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "",
      }));
    } catch (err) {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: err.message,
      }));
    }

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    inputValue,
    updateInputState,
    errorMessage,
    setErrorMessage,
  };
};
