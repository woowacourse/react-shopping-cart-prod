import { useRef, useEffect } from 'react';

interface UseCounterProps {
  count: number;
  onChange: (count: number) => void;
  onBlur: (count: number) => void;
}

const useCounter = ({ count, onChange, onBlur }: UseCounterProps) => {
  const isLocked = useRef(false);

  useEffect(() => {
    isLocked.current = false;
  });

  const increaseCount = () => {
    if (count >= 99 || isLocked.current) return;

    isLocked.current = true;
    onChange(count + 1);
  };

  const decreaseCount = () => {
    if (isLocked.current) return;

    isLocked.current = true;

    if (count <= 1) {
      onBlur(0);
      return;
    }

    onChange(count - 1);
  };

  const updateCount = (count: number) => {
    if (isLocked.current) return;

    isLocked.current = true;
    onChange(count);
  };

  return {
    increaseCount,
    decreaseCount,
    updateCount,
  } as const;
};

export default useCounter;
