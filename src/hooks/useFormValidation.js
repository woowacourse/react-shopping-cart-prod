import { useMemo, useState } from 'react';

function useFormValidation(validationList) {
  const formItems = useMemo(() => Object.keys(validationList), []);
  const [errorList, setError] = useState({});

  const validationForm = async ({ name, formData }) => {
    const newState = { ...errorList };

    try {
      await validationList[name](formData);
      newState[name] = '';
    } catch (error) {
      newState[name] = error.message;
    }

    setError(newState);
  };

  const isAllPassed = formItems.every((name) => errorList[name] === '');

  return { errorList, isAllPassed, validationForm };
}

export default useFormValidation;
