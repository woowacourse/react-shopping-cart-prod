import { useCallback, useEffect, useState } from 'react';

export default function useWindowsSize() {
  const [windowSize, setWindowSize] = useState();

  const handleChangeWindowSize = useCallback(({ target: { innerWidth } }) => {
    setWindowSize(innerWidth);
  });

  useEffect(() => {
    window.addEventListener('resize', handleChangeWindowSize);
    return () => window.removeEventListener('resize', handleChangeWindowSize);
  }, []);

  return windowSize;
}
