import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ScrollType = {
  to: 'top' | 'bottom';
  position: number;
  behavior: ScrollBehavior;
};

const useScroll = ({ to, position, behavior }: ScrollType) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      [to]: position,
      behavior,
    });
  }, [pathname]);

  return null;
};

export default useScroll;
