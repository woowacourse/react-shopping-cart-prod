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
    const { validation } = field;
    if (validation) {
      if (validation.pattern) {
        const {
          pattern: { value: regex, message },
        } = validation;
        if (!regex) throw new Error("정규식을 넣어주세요!");
        if (value && !regex.test(value)) {
          setErrors((prev) => {
            const newState = structuredClone(prev);
            newState[name] = message;
            return newState;
          });
          return;
        }
      }
      if (validation.customValidator) {
        const { isValid, errorMessage } = validation.customValidator(value);
        if (!isValid) {
          setErrors((prev) => {
            const newState = structuredClone(prev);
            newState[name] = errorMessage;
            return newState;
          });
          return;
        }
      }
    }

    setErrors((prev) => {
      const newState = structuredClone(prev);
      newState[name] = null;
      return newState;
    });
  };

  useEffect(() => {
    const initialState = Object.keys(_fields.current).reduce((acc, cur) => {
      acc[cur] = null;
      return acc;
    }, {});
    setFormData(structuredClone(initialState));
    setErrors(structuredClone(initialState));
  }, []);

  // 우리의 handleChange를 호출하면서, 사용자가 직접 넣은 handleChange도 실행 같이 해주고 싶다.

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
