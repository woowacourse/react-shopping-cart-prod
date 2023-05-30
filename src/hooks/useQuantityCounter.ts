import { useRef, useState } from 'react';
import { showInputErrorMessage } from '@utils/common';
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  QUANTITY_ERROR_MESSAGE,
} from '@constants/cartConstants';

interface OptionsParams {
  deleteItem: () => void;
  updateItem: (value: number) => void;
}

const INIT_VALUE = 1;

export const useQuantityCounter = (
  initialValue: number,
  { deleteItem, updateItem }: OptionsParams
) => {
  const countInputRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState(initialValue);

  const increaseQuantity = () => {
    if (quantity >= MAX_CART_QUANTITY) {
      showInputErrorMessage(
        isMaximumCountError(quantity + 1),
        countInputRef.current,
        QUANTITY_ERROR_MESSAGE
      );
      return;
    }

    updateItem(quantity + 1);
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = async () => {
    showInputErrorMessage(
      isMaximumCountError(quantity - 1),
      countInputRef.current,
      QUANTITY_ERROR_MESSAGE
    );

    if (quantity <= MIN_CART_QUANTITY + 1) {
      deleteItem();
      return;
    }

    updateItem(quantity - 1);
    setQuantity((prev) => prev - 1);
  };

  const isMaximumCountError = (value: number = quantity) => {
    return value > MAX_CART_QUANTITY;
  };

  const onQuantityChange = (value: number) => {
    if (value > MAX_CART_QUANTITY) {
      showInputErrorMessage(
        isMaximumCountError(value),
        countInputRef.current,
        QUANTITY_ERROR_MESSAGE
      );

      setQuantity(MAX_CART_QUANTITY);
      return;
    }

    setQuantity(value);
  };

  const onQuantityBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const { relatedTarget, target } = event;

    if (relatedTarget?.parentElement?.parentElement === target.parentElement) return;

    if (quantity === 0) {
      setQuantity(INIT_VALUE);
      deleteItem();
      return;
    }

    updateItem(quantity);
  };

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange,
    countInputRef,
    onQuantityBlur,
  };
};
