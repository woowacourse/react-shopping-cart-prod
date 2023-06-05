import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [isScrollDown, setIsScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 400;
      const scrollPosition = window.scrollY || window.pageYOffset;

      setIsScrollDown(scrollPosition < scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return { isScrollDown };
};
