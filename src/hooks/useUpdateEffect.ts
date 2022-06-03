import { useEffect, useRef } from 'react';

const useUpdateEffect = (callbackFunc: () => any, dependancy: any[]) => {
  const isFirstTime = useRef(true);

  useEffect(() => {
    if (!isFirstTime.current) {
      return callbackFunc();
    }
    isFirstTime.current = false;
  }, dependancy);
};

export default useUpdateEffect;
