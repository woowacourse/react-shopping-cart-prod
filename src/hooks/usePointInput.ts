import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import cartOrderPriceState from '../recoil/selectors/cartOrderPriceState';

const usePointInput = (useablePoint: number) => {
  const prices = useRecoilValue(cartOrderPriceState);
  const [inputValue, setInputValue] = useState('');

  const checkPointInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value % 10 !== 0) {
      e.target.value = `${Math.floor(+e.target.value / 10).toString()}0`;
    }

    if (+e.target.value > useablePoint) {
      e.target.value = `${Math.floor(+useablePoint / 10).toString()}0`;
    }

    if (+e.target.value > prices.total) {
      e.target.value = `${Math.floor(+prices.total / 10).toString()}0`;
    }

    setInputValue(e.target.value);
  };

  return { checkPointInput, inputValue };
};

export default usePointInput;
