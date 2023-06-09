import { ChangeEventHandler } from 'react';
import { SetterOrUpdater } from 'recoil';
import { QUANTITY } from '../constants';

interface Props {
  removeItemFromCart: () => void;
  setQuantity: SetterOrUpdater<number>;
  updateCart: (value: number) => void;
}

export const useHandleQuantityInput = ({ ...props }: Props) => {
  const { removeItemFromCart, setQuantity, updateCart } = props;

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target: { valueAsNumber } }) => {
    if (valueAsNumber === QUANTITY.NONE) {
      removeItemFromCart();

      return setQuantity(QUANTITY.INITIAL);
    }

    setQuantity(valueAsNumber);
    updateCart(valueAsNumber);
  };

  return handleNumberInputChange;
};
