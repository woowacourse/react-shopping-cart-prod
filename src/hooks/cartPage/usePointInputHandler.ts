import { useState } from 'react';

export const usePointInputHandler = (canUsingUserPoint: number) => {
  const [usingPoint, setUsingPoint] = useState<number>(0);

  if (usingPoint !== undefined && usingPoint > canUsingUserPoint)
    setUsingPoint(canUsingUserPoint);

  const handleInputValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputValue = Number(e.target.value);

    if (inputValue < 0) return setUsingPoint(0);
    if (inputValue > canUsingUserPoint) return setUsingPoint(canUsingUserPoint);

    setUsingPoint(inputValue);
  };

  const handleOnBlurFromInput: React.FocusEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.target.style.border = 'none';
    e.target.style.borderBottom = '2px solid #c0c0c0';
    e.target.style.borderRadius = '0px';
  };

  const handleOnFocusFromInput: React.FocusEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.target.select();
    e.target.style.border = '2px solid #c0c0c0';
  };

  return {
    handleInputValueChange,
    handleOnBlurFromInput,
    handleOnFocusFromInput,
    usingPoint,
    setUsingPoint,
  };
};
