import { useEffect, useRef, useState } from 'react';
import { showInputErrorMessage } from '@utils/common';
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  QUANTITY_ERROR_MESSAGE,
  QUANTITY_MINIMUM_ERROR_MESSAGE,
} from '@constants/cartConstants';

interface OptionsParams {
  removeCartItemAndDelete: () => void;
  updateCartItemAndSync: (value: number) => void;
}

const INIT_VALUE = 1;

export const useQuantityCounter = (
  initialValue: number,
  { removeCartItemAndDelete, updateCartItemAndSync }: OptionsParams
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

    updateCartItemAndSync(quantity + 1);
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = async () => {
    showInputErrorMessage(
      isMaximumCountError(quantity - 1),
      countInputRef.current,
      QUANTITY_ERROR_MESSAGE
    );

    if (quantity <= MIN_CART_QUANTITY + 1) {
      removeCartItemAndDelete();
      return;
    }

    updateCartItemAndSync(quantity - 1);
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

  const onQuantityBlur = async (event: React.FocusEvent<HTMLInputElement>, isCartPage: boolean) => {
    const { relatedTarget, target } = event;

    const isSameDiv = relatedTarget?.parentElement?.parentElement === target.parentElement;

    const isCartPageAndZero = isCartPage && quantity === 0;
    if (isSameDiv) return;

    showInputErrorMessage(isCartPageAndZero, countInputRef.current, QUANTITY_MINIMUM_ERROR_MESSAGE);

    if (isCartPageAndZero) {
      showInputErrorMessage(
        isCartPageAndZero,
        countInputRef.current,
        QUANTITY_MINIMUM_ERROR_MESSAGE
      );

      return;
    }

    if (quantity === 0) {
      setQuantity(INIT_VALUE);
      removeCartItemAndDelete();
      return;
    }

    updateCartItemAndSync(quantity);
  };

  useEffect(() => {
    setQuantity(initialValue);
  }, [initialValue]);

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange,
    countInputRef,
    onQuantityBlur,
  };
};
