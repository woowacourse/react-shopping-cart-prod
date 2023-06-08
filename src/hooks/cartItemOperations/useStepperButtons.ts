import { useCallback } from 'react';
import useCart from '../useCart.ts';
import usePostUpdateCartItem from '../requests/usePostUpdateCartItem.ts';
import { useToast } from '../useToast.ts';
import TOAST_MESSAGES from '../../constants/TOAST_MESSAGES.ts';
import { Product } from '../../types/CartList.ts';

type StpperButtonsHookProps = Product & {
  cartItemNumber: number | undefined;
  refetchCartList: ({}) => void;
};

const useStepperButtons = ({ cartItemNumber, id, name, price, imageUrl, refetchCartList }: StpperButtonsHookProps) => {
  const { updateCart } = useCart();
  const { updateCartItem } = usePostUpdateCartItem();
  const showToast = useToast();

  const handleStepperIncreaseButton = useCallback(async (quantity: number) => {
    if (!cartItemNumber) return;
    await updateCartItem({ param: cartItemNumber, body: { quantity: quantity + 1 } });
    await refetchCartList({});
    updateCart({ id: cartItemNumber, quantity: quantity + 1, product: { id, name, price, imageUrl }, isSelected: true });
  }, []);

  const handleStepperDecreaseButton = useCallback(async (quantity: number) => {
    if (!cartItemNumber) return;
    await updateCartItem({ param: cartItemNumber, body: { quantity: quantity - 1 } });
    if (quantity === 1) {
      showToast(TOAST_MESSAGES.DELETED);
    }
    await refetchCartList({});
    updateCart({ id: cartItemNumber, quantity: quantity - 1, product: { id, name, price, imageUrl }, isSelected: true });
  }, []);

  return { handleStepperIncreaseButton, handleStepperDecreaseButton };
};

export default useStepperButtons;
