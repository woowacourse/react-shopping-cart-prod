import { useState } from 'react';

export const usePointInput = (availablePoint: number) => {
  const [usingPoint, setUsingPoint] = useState<number>(0);

  if (usingPoint !== undefined && usingPoint > availablePoint)
    setUsingPoint(availablePoint);

  const handleInputValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputValue = Number(e.target.value);

    if (inputValue < 0) return setUsingPoint(0);
    if (inputValue > availablePoint) return setUsingPoint(availablePoint);

    setUsingPoint(inputValue);
  };

  return {
    handleInputValueChange,
    usingPoint,
    setUsingPoint,
  };
};
