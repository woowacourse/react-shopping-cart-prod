import { useState } from "react";

import { STATUS, REGULAR_EXPRESSION, ERROR_STATUS } from "@/constants";

const useInput = (type, initialState, initialValue = "") => {
  const [inputState, setInputState] = useState({
    value: initialValue,
    status: initialState,
  });

  const onChangeInput = (e) => {
    const {
      target: { value },
    } = e;
    setInputState((prev) => ({ ...prev, value }));

    if (!value.match(REGULAR_EXPRESSION[type])) {
      setInputState((prev) => ({
        ...prev,
        status: ERROR_STATUS[`${type}_RULE`],
      }));
      return;
    }

    setInputState((prev) => ({ ...prev, status: STATUS.FULFILLED }));
  };

  return [inputState, onChangeInput, setInputState];
};

export default useInput;
