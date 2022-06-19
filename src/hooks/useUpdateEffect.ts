import { useEffect, useRef } from 'react';

const useUpdateEffect = (callbackFunc: () => any, dependencies: any[]) => {
  const isFirstTime = useRef(true);

  useEffect(() => {
    if (!isFirstTime.current) {
      return callbackFunc();
    }
    isFirstTime.current = false;
  }, dependencies);
};

export default useUpdateEffect;
