import { useState } from "react";

import { ERROR_STATUS, STATUS } from "@/constants";

const usePasswordConfirm = () => {
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    status: STATUS.READY,
  });

  const onChangePasswordConfirm = (e, password) => {
    const {
      target: { value },
    } = e;
    setPasswordConfirm((prev) => ({ ...prev, value }));

    if (value !== password) {
      setPasswordConfirm((prev) => ({
        ...prev,
        status: ERROR_STATUS.MISMATCH,
      }));
      return;
    }

    setPasswordConfirm((prev) => ({ ...prev, status: STATUS.FULFILLED }));
  };

  return [passwordConfirm, onChangePasswordConfirm];
};

export default usePasswordConfirm;
