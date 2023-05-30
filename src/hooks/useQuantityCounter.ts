import { useRef, useState } from 'react';
import { showInputErrorMessage } from '@utils/common';
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  QUANTITY_ERROR_MESSAGE,
} from '@constants/cartConstants';

export const useQuantityCounter = (initialValue: number) => {
  const countInputRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState(initialValue);

  const increaseQuantity = () => {
    if (quantity >= MAX_CART_QUANTITY) {
      showInputErrorMessage(isMaximumCountError(), countInputRef.current, QUANTITY_ERROR_MESSAGE);
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= MIN_CART_QUANTITY) return;

    showInputErrorMessage(
      isMaximumCountError(quantity - 1),
      countInputRef.current,
      QUANTITY_ERROR_MESSAGE
    );
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

  return { quantity, increaseQuantity, decreaseQuantity, onQuantityChange, countInputRef };
};
