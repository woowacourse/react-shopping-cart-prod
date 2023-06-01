import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { toastState } from '../states/toast/atom';

export const useToast = () => {
  const toastInfo = useRecoilValue(toastState);
  const resetToastState = useResetRecoilState(toastState);
  const [toastTimeId, setToastTimeId] = useState<number | null>(null);

  useEffect(() => {
    if (toastTimeId) clearTimeout(toastTimeId);

    const resetToast = (timeId: number) => {
      resetToastState();
      setToastTimeId(null);
      clearTimeout(timeId);
    };

    const timeId = setTimeout(resetToast, toastInfo ? toastInfo.duration : 0);
    setToastTimeId(timeId);
  }, [toastInfo]);

  return toastInfo;
};
