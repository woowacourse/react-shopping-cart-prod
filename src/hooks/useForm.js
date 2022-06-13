import { useMemo, useReducer, useRef } from 'react';

const VALIDATION = {
  INITIAL: false,
  TRIED: true,
};

function errorReducer(state, { type, errorMessage }) {
  return { ...state, [type]: errorMessage };
}

function useForm(validationList = {}) {
  const validationTargets = useMemo(() => Object.keys(validationList), []);

  const formValuesRef = useRef({});
  const validationTriggerRef = useRef({});

  const [errorList, setErrorList] = useReducer(errorReducer, {});

  const inputValidation = async (name) => {
    if (!validationList[name]) return;

    try {
      await validationList[name](formValuesRef.current);
      setErrorList({ type: name, errorMessage: null });

      return true;
    } catch (error) {
      setErrorList({ type: name, errorMessage: error.message });

      return false;
    }
  };

  const onSubmitForm = (submitHandler) => (event) => {
    event.preventDefault();

    const validationTrigger = validationTriggerRef.current;
    const validations = [];

    validationTargets.forEach((name) => {
      if (validationTrigger[name] === VALIDATION.TRIED && errorList[name] === null) {
        return true;
      }

      validations.push(inputValidation(name));
    });

    Promise.all(validations).then((passResult) => {
      const isAllPassed = passResult.every((isPassed) => isPassed === true);

      isAllPassed === true && submitHandler(event);
    });
  };

  const setInputValue = ({ name, value, isState = VALIDATION.INITIAL }) => {
    formValuesRef.current = { ...formValuesRef.current, [name]: value };
    validationTriggerRef.current = { ...validationTriggerRef.current, [name]: isState };

    isState === VALIDATION.TRIED && inputValidation(name);
  };

  const onChangeInput = ({ target }) => {
    setInputValue(target);
  };

  const onBlurInput = ({ target }) => {
    if (!target.name) return;

    const { name, value } = target;

    setInputValue({ name, value, isState: VALIDATION.TRIED });
  };

  const isAllPassed = validationTargets.every((name) => errorList[name] === null);

  return { onChangeInput, onBlurInput, onSubmitForm, errorList, isAllPassed };
}

export default useForm;
