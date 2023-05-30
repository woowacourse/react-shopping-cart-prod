import { useSetRecoilState } from "recoil";
import { toastState } from "../recoil/atom";
import { ToastType } from "../types/domain";

let timeoutID: null | number = null;

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  const showToast = (
    type: ToastType["type"],
    message: ToastType["message"]
  ) => {
    if (timeoutID !== null) clearTimeout(timeoutID);

    setToast({ isShown: true, type, message });

    timeoutID = window.setTimeout(() => {
      setToast({ isShown: false, type, message: "" });
    }, 2000);
  };

  return { showToast };
};
