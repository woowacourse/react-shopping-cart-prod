import type { ToastInfoType } from '../types';

import { useSetRecoilState } from 'recoil';
import { toastInfoState } from '../recoil/state';

let timeoutID: null | number = null;

const useToast = () => {
  const setToastInfo = useSetRecoilState(toastInfoState);

  const showToast = (type: ToastInfoType['type'], message: ToastInfoType['message']) => {
    if (timeoutID !== null) clearTimeout(timeoutID);

    setToastInfo({ show: true, type, message });

    timeoutID = window.setTimeout(() => {
      setToastInfo({ show: false, type, message: '' });
    }, 1600);
  };

  return { showToast };
};

export default useToast;
