import { useEffect, useRef, useState } from 'react';

import { TOAST_SHOW_DURATION } from '../../constants/ui';

const useToast = () => {
  const [isToastAdded, setIsToastAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isToastAdded) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setIsToastAdded(false);
      }, TOAST_SHOW_DURATION);
    }
  }, [isToastAdded]);

  return { isToastAdded, setIsToastAdded };
};

export { useToast };
