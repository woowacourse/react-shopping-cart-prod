import { useFetchUsablePoint } from '@recoils/usablePointAtoms';
import { isNumeric } from '@utils/index';
import { ChangeEvent, useState } from 'react';

export const usePoint = (totalProductsPrice: number, shippingFee: number) => {
  const usablePoint = useFetchUsablePoint();
  const [pointInputValue, setPointInputValue] = useState(0);

  const maxUsablePoint = totalProductsPrice + shippingFee;

  const onClickUseAllPointButton = () => {
    if (usablePoint >= maxUsablePoint) {
      return setPointInputValue(maxUsablePoint);
    }

    return setPointInputValue(usablePoint);
  };

  const onChangePointInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(value)) return;

    if (Number(value) >= usablePoint) {
      return setPointInputValue(usablePoint);
    }

    if (Number(value) >= maxUsablePoint) {
      return setPointInputValue(maxUsablePoint);
    }

    setPointInputValue(Number(value));
  };

  return { usablePoint, pointInputValue, onClickUseAllPointButton, onChangePointInput };
};
