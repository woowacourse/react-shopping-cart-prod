import { useRecoilValue } from 'recoil';
import * as Styled from './ToastProvider.styles';
import { toastStore, toastVisibilityStore } from '../../stores/toastStore.ts';
import { ReactNode } from 'react';

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useRecoilValue(toastStore);
  const toastVisible = useRecoilValue(toastVisibilityStore);

  return (
    <>
      {children}
      {toastVisible && toast && <Styled.Toast>{toast}</Styled.Toast>}
    </>
  );
};

export default ToastProvider;
