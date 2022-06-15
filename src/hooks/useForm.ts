import React, { RefCallback, useRef, useState } from 'react';

type Name = HTMLInputElement['name'];

type Value = React.InputHTMLAttributes<HTMLInputElement>['value'];

type Validation = {
  validate: (value: HTMLInputElement['value']) => boolean;
  validationMessage: HTMLInputElement['validationMessage'];
};

type FormValues = Record<Name, Value>;

type Error = HTMLInputElement['validationMessage'];

type Errors = Record<Name, Error>;

type Touched = Record<Name, boolean>;

type RegisterProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'defaultValue' | 'defaultChecked'
> &
  Partial<{
    patternMessage: Error;
    watch: boolean;
    customValidations: Validation[];
  }>;

type InputControl = {
  element: HTMLInputElement;
  reportValidity: () => boolean;
  checkValidity: () => boolean;
  checkCustomValidity?: () => boolean;
};

type InputController = Record<Name, InputControl>;

type UseFormProps = {
  validationMode: 'onchange' | 'onsubmit';
  shouldUseReportValidity: boolean;
};

export const defaultProps: UseFormProps = {
  validationMode: 'onsubmit',
  shouldUseReportValidity: true,
};

const useForm = ({
  validationMode,
  shouldUseReportValidity,
}: UseFormProps = defaultProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchingValues, setWatchingValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const inputController = useRef<InputController>({});
  const inputElementList = useRef<HTMLInputElement[]>([]);

  const validate = (name: Name) => {
    const inputControl = inputController.current[name];
    const inputElement = inputControl.element;

    shouldUseReportValidity
      ? inputControl.reportValidity()
      : inputControl.checkValidity();

    if (inputElement.validity.valid && inputControl.checkCustomValidity) {
      inputControl.checkCustomValidity();
    }

    setErrors((prev) => ({
      ...prev,
      [name]: inputElement.validationMessage,
    }));
  };

  const bindElementToInputControlAndWatchingValues =
    ({
      watch,
      customValidations,
      patternMessage,
    }: Partial<RegisterProps>): RefCallback<HTMLInputElement> =>
    (element) => {
      if (!element || inputController.current[element.name]) return;

      const { name, defaultValue } = element;
      const shouldWatch =
        watch && !Object.prototype.hasOwnProperty.call(watchingValues, name);

      if (shouldWatch) {
        setWatchingValues((prev) => ({
          ...prev,
          [name]: defaultValue?.toString() ?? '',
        }));
      }

      inputElementList.current.push(element);

      inputController.current[name] = {
        element,
        reportValidity: () => {
          element.setCustomValidity('');
          const isValid = element.reportValidity();

          if (element.validity.patternMismatch && patternMessage) {
            element.setCustomValidity(patternMessage);
          }

          return isValid;
        },
        checkValidity: () => {
          element.setCustomValidity('');
          const isValid = element.checkValidity();

          if (element.validity.patternMismatch && patternMessage) {
            element.setCustomValidity(patternMessage);
          }

          return isValid;
        },
      };

      if (customValidations) {
        inputController.current[name].checkCustomValidity = () => {
          const isValid = customValidations.every(
            ({ validate, validationMessage }) => {
              const isValid = validate(
                inputController.current[name].element.value
              );

              inputController.current[name].element.setCustomValidity(
                isValid ? validationMessage : ''
              );

              return isValid;
            }
          );

          return isValid;
        };
      }
    };

  const getNextInputByName = (name: Name) => {
    const currentElementIndex = inputElementList.current.findIndex(
      (element) => element.name === name
    );
    const nextElement =
      currentElementIndex + 1 < inputElementList.current.length
        ? inputElementList.current[currentElementIndex + 1]
        : null;

    return nextElement;
  };

  const getPrevInputByName = (name: Name) => {
    const currentElementIndex = inputElementList.current.findIndex(
      (element) => element.name === name
    );
    const prevElement =
      currentElementIndex - 1 >= 0
        ? inputElementList.current[currentElementIndex - 1]
        : null;

    return prevElement;
  };

  const updateWatchingValue = (name: Name, value: Value) => {
    if (Object.prototype.hasOwnProperty.call(watchingValues, name)) {
      setWatchingValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChange =
    (
      onChange?: React.FormEventHandler<HTMLInputElement>
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const {
        target: { name, value },
      } = e;

      if (validationMode === 'onchange') {
        validate(name);
        setTouched((prev) => ({ ...prev, [name]: true }));
      }

      updateWatchingValue(name, value);

      if (onChange) {
        onChange(e);
      }

      if (
        e.target.getAttribute('maxlength') &&
        value.length >= Number(e.target.getAttribute('maxlength'))
      ) {
        getNextInputByName(name)?.focus();
      }
    };

  const handleBlur =
    (
      onBlur?: React.FormEventHandler<HTMLInputElement>
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const {
        target: { name },
      } = e;

      if (validationMode === 'onchange') {
        validate(name);
        setTouched((prev) => ({ ...prev, [name]: true }));
      }

      if (onBlur) {
        onBlur(e);
      }
    };

  const handleKeyDown =
    (
      onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    ): React.KeyboardEventHandler<HTMLInputElement> =>
    (e) => {
      const { keyCode, target } = e;
      const { name, value } = target as HTMLInputElement;

      if (onKeyDown) {
        onKeyDown(e);
      }

      const isBackspace = keyCode === 8;

      if (isBackspace && value === '') {
        getPrevInputByName(name)?.focus();
      }
    };

  const handleSubmit =
    (
      onValid: React.FormEventHandler<HTMLFormElement>,
      onError?: React.FormEventHandler<HTMLFormElement>
    ): React.FormEventHandler<HTMLFormElement> =>
    (e) => {
      e.preventDefault();

      if (!shouldUseReportValidity) {
        inputElementList.current.forEach(({ name }) => {
          validate(name);
          setTouched((prev) => ({ ...prev, [name]: true }));
        });
      }

      const isValid = Object.values(errors).every((error) => error === '');

      setIsSubmitting(true);

      try {
        if (isValid) {
          onValid(e);

          return;
        }

        if (onError) {
          onError(e);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    };

  const registerInput = (
    name: Name,
    attributes: RegisterProps
  ): React.InputHTMLAttributes<HTMLInputElement> & {
    ref: RefCallback<HTMLInputElement>;
  } => {
    const {
      watch,
      customValidations,
      patternMessage,
      onChange,
      onBlur,
      onKeyDown,
      ...rest
    } = attributes;

    return {
      name,
      ref: bindElementToInputControlAndWatchingValues({
        watch,
        customValidations,
        patternMessage,
      }),
      onChange: handleChange(onChange),
      onBlur: handleBlur(onBlur),
      onKeyDown: handleKeyDown(onKeyDown),
      ...rest,
    };
  };

  const registerForm = ({
    onSubmit,
    onError,
  }: {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onError?: React.FormEventHandler<HTMLFormElement>;
  }) => ({
    onSubmit: handleSubmit(onSubmit, onError),
    disabled: isSubmitting,
    noValidate: !shouldUseReportValidity,
  });

  return {
    isSubmitting,
    watchingValues,
    errors,
    touched,
    registerForm,
    registerInput,
  };
};

export default useForm;
