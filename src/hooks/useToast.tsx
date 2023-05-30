import { ToastType } from '../types';
import { useSetRecoilState } from 'recoil';
import ToastState from '../store/ToastState';

const useToast = () => {
  const setToastItem = useSetRecoilState(ToastState);

  const showToast = (message: string, type: ToastType) => {
    setToastItem((prev) => [...prev, { message, type }]);
  };

  const toast = {
    success: (message: string) => {
      showToast(message, 'success');
    },

    error: (message: string) => {
      showToast(message, 'error');
    },
  };

  const resetToast = () => {
    setToastItem([]);
  };

  return { toast, resetToast };
};

export default useToast;
