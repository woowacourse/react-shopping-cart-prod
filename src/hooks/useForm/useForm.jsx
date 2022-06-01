import { useState, useRef } from "react";

function useForm() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const _fields = useRef(null);
  !_fields.current && (_fields.current = {});

  const handleSubmit = (onSubmit) => (event) => {
    event.preventDefault();
    onSubmit(formData, errors);
  };

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    const field = _fields.current[name];
    const { validation } = field;
    if (validation) {
      const {
        pattern: { value: regex, message },
      } = validation;
      if (!regex) throw new Error("정규식을 넣어주세요!");
      if (value && !regex.test(value)) {
        setFormData((prev) => {
          const newState = structuredClone(prev);
          delete newState[name];
          return newState;
        });
        setErrors((prev) => {
          const newState = structuredClone(prev);
          newState[name] = message;
          return newState;
        });
        return;
      }
    }

    setErrors((prev) => {
      const newState = structuredClone(prev);
      delete newState[name];
      return newState;
    });
    // 라이브러리에서 해주는 일
    setFormData((prev) => {
      const newState = structuredClone(prev);
      newState[name] = value;
      return newState;
    });
  };

  // 우리의 handleChange를 호출하면서, 사용자가 직접 넣은 handleChange도 실행 같이 해주고 싶다.

  const register = (name, options) => {
    return {
      ref: (ref) => {
        if (!ref) return;
        _fields.current[name] = {
          ref,
          validation: {
            pattern: options?.pattern,
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
