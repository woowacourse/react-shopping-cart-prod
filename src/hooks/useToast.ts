import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { toastState } from '../states/toast';

const useToast = () => {
  const toastInfo = useRecoilValue(toastState);
  const resetToastState = useResetRecoilState(toastState);

  useEffect(() => {
    if (toastInfo === null) return;

    const closeTimeout = setTimeout(() => {
      resetToastState();
      clearTimeout(closeTimeout);
    }, toastInfo.duration);

    return () => {
      clearTimeout(closeTimeout);
    };
  }, [resetToastState, toastInfo]);

  return toastInfo;
};

export default useToast;
