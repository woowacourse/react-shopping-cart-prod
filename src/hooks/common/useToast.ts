import { useEffect, useRef, useState } from 'react';

import { TOAST_SHOW_DURATION } from '../../constants/ui';

const useToast = () => {
  const [isAdded, setIsAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isAdded) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setIsAdded(false);
      }, TOAST_SHOW_DURATION);
    }
  }, [isAdded]);

  return { isAdded, setIsAdded };
};

export { useToast };
