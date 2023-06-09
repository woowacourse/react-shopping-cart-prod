import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [isScrollDown, setIsScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = ([entry]: IntersectionObserverEntry[]) => {
      setIsScrollDown(!entry.isIntersecting);
    };

    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleScroll, options);

    const target = document.getElementById('payment-form');

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return { isScrollDown };
};
