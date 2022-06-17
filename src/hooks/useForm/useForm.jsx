import { useState, useRef, useEffect } from "react";

function useForm() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const _fields = useRef(null);
  !_fields.current && (_fields.current = {});

  const handleSubmit = (onSubmit) => (event) => {
    event.preventDefault();
    const formData = Object.keys(_fields.current).reduce((acc, cur) => {
      acc[cur] = _fields.current[cur].ref.value;
      return acc;
    }, {});

    const errors = Object.keys(_fields.current).reduce((acc, cur) => {
      const field = _fields.current[cur];
      const { ref: input, validation } = field;

      if (validation) {
        if (validation.pattern) {
          const { value: regex, message } = validation.pattern;
          const testResult = regex.test(input.value);
          if (!testResult) {
            acc[cur] = message;
          }
        }

        if (validation.customValidator) {
          const { isValid, errorMessage } = validation.customValidator(
            input.value
          );
          if (!isValid) {
            acc[cur] = errorMessage;
          }
        }
      }
      return acc;
    }, {});

    onSubmit(formData, errors);
  };

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setFormData((prev) => {
      const newState = structuredClone(prev);
      newState[name] = value;
      return newState;
    });

    const field = _fields.current[name];
    const {
      validation: { pattern, customValidator },
    } = field;

    if (pattern) {
      const { value: regex, message } = pattern;

      if (value && !regex.test(value)) {
        setErrors((prev) => {
          const newState = structuredClone(prev);
          newState[name] = message;
          return newState;
        });
        return;
      }
    }
    if (customValidator) {
      const { isValid, errorMessage } = customValidator(value);

      if (!isValid) {
        setErrors((prev) => {
          const newState = structuredClone(prev);
          newState[name] = errorMessage;
          return newState;
        });
        return;
      }
    }

    setErrors((prev) => {
      const newState = structuredClone(prev);
      newState[name] = null;
      return newState;
    });
  };

  useEffect(() => {
    const initialFormData = Object.keys(_fields.current).reduce((acc, cur) => {
      acc[cur] = _fields.current[cur].ref.defaultValue ?? null;
      return acc;
    }, {});
    const initialErrors = Object.keys(_fields.current).reduce((acc, cur) => {
      acc[cur] = null;
      return acc;
    }, {});

    setFormData(structuredClone(initialFormData));
    setErrors(structuredClone(initialErrors));
  }, []);

  const register = (name, options) => {
    if (
      options?.customValidator &&
      typeof options?.customValidator !== "function"
    ) {
      throw new Error("customValidator는 함수여야합니다!");
    }

    return {
      ref: (ref) => {
        if (!ref) return;
        _fields.current[name] = {
          ref,
          validation: {
            pattern: options?.pattern,
            customValidator: options?.customValidator,
          },
        };
      },
      name,
      onChange: handleChange,
    };
  };

  return {
    register,
    onSubmit: handleSubmit,
    errors,
    formData,
  };
}

export default useForm;
