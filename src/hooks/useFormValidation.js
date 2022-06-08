import { useMemo, useState } from 'react';

import { getFormData } from 'lib/formUtils';

function useFormValidation(validationList) {
  const formItems = useMemo(() => Object.keys(validationList), []);
  const [errorList, setError] = useState({});

  const validationForm = async ({ name }, formData) => {
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

  const onBlurTextField = async ({ target }) => {
    if (target.tagName === 'BUTTON') return;

    const formData = getFormData(target.form);

    validationForm({ name: target.name }, formData);
  };

  const onSubmitForm = (submitAction) => (event) => {
    event.preventDefault();

    const formData = getFormData(event.target);
    submitAction(formData);
  };

  return { errorList, isAllPassed, onBlurTextField, onSubmitForm };
}

export default useFormValidation;
