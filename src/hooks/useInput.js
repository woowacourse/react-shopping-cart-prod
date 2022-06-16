import { useState } from "react";

import { ERROR_STATUS, STATUS } from "@/constants";

const REGULAR_EXPRESSION = {
  EMAIL:
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  NICKNAME: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
};

const useInput = (type, initialState, initialValue = "") => {
  const [inputState, setInputState] = useState({
    value: initialValue,
    status: initialState,
  });

  const onChangeInput = (e) => {
    const {
      target: { value },
    } = e;

    if (!value.match(REGULAR_EXPRESSION[type])) {
      setInputState({
        value,
        status: ERROR_STATUS[`${type}_RULE`],
      });
      return;
    }

    setInputState({ value, status: STATUS.FULFILLED });
  };

  return [inputState, onChangeInput, setInputState];
};

export default useInput;
