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

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;
    const numberValue = Number(value);

    if (numberValue === QUANTITY.NONE) {
      removeItemFromCart();

      return setQuantity(QUANTITY.INITIAL);
    }

    setQuantity(numberValue);
    updateCart(numberValue);
  };

  return handleNumberInputChange;
};
