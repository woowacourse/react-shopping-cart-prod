import { toastInfoState } from '../../atom/toastInfo';
import type { ToastInfoType } from '../../types';
import { useSetRecoilState } from 'recoil';

let timeoutID: null | number = null;

const useToast = () => {
  const setToastInfo = useSetRecoilState(toastInfoState);

  const showToast = (type: ToastInfoType['type'], message: ToastInfoType['message']) => {
    if (timeoutID !== null) clearTimeout(timeoutID);

    setToastInfo({ show: true, type, message });

    timeoutID = window.setTimeout(() => {
      setToastInfo({ show: false, type, message: '' });
    }, 2000);
  };

  return { showToast };
};

export default useToast;
