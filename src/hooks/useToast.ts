import { useSetRecoilState } from 'recoil';
import { toastStore, toastVisibilityStore } from '../stores/toastStore.ts';

export const useToast = () => {
  const setToast = useSetRecoilState(toastStore);
  const setToastVisibility = useSetRecoilState(toastVisibilityStore);

  return (message: string) => {
    setToast(message);
    setToastVisibility(true);

    setTimeout(() => {
      setToast(null);
      setToastVisibility(false);
    }, 2000);
  };
};
