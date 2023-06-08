import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { toastState } from "../recoil/atom";
import { ToastType } from "../types/domain";

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);
  const timeoutID = useRef<number | null>(null);

  const showToast = (
    type: ToastType["type"],
    message: ToastType["message"]
  ) => {
    if (timeoutID.current) clearTimeout(timeoutID.current);

    setToast({ isShown: true, type, message });

    timeoutID.current = window.setTimeout(() => {
      setToast({ isShown: false, type, message: "" });
    }, 2000);
  };

  return { showToast };
};
