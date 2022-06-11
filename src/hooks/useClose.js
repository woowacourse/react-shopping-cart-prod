import { useState } from 'react';
import { TIMER } from 'utils/constants';

const useClose = () => {
  const [debounce, setDebounce] = useState(null);

  const clearTimer = () => {
    if (debounce) {
      clearTimeout(debounce);
    }
  };

  const setAutoCloseTimer = callback => {
    setDebounce(setTimeout(() => callback(), TIMER.QUANTITY_CONTROLLER_CLOSE_TIME));
  };

  const extendTimer = callback => {
    clearTimer();
    setAutoCloseTimer(callback);
  };

  return [clearTimer, setAutoCloseTimer, extendTimer];
};

export default useClose;
