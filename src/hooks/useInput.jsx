import { useState } from "react";

import { STATUS, REGULAR_EXPRESSION, ERROR_STATUS } from "@/constants";

const useInput = (type, initialState) => {
  const [inputState, setInputState] = useState({
    value: "",
    status: initialState,
  });

  const onChangeInput = (e) => {
    const {
      target: { value },
    } = e;
    setInputState((prev) => ({ ...prev, value: value }));

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
