import { useCallback } from 'react';
import useCart from '../useCart.ts';
import usePostUpdateCartItem from '../requests/usePostUpdateCartItem.ts';

type StpperButtonsHookProps = {
  cartItemNumber: number | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: ({}) => void;
};

const useStepperButtons = ({ cartItemNumber, id, name, price, imageUrl, refetchCartList }: StpperButtonsHookProps) => {
  const { updateCart } = useCart();
  const { updateCartItem } = usePostUpdateCartItem();

  const handleStepperIncreaseButton = useCallback(async (quantity: number) => {
    await updateCartItem({ param: cartItemNumber, body: { quantity: quantity + 1 } });
    await refetchCartList({});
    if (!cartItemNumber) return;
    updateCart({ id: cartItemNumber, quantity: quantity + 1, product: { id, name, price, imageUrl }, isSelected: true });
  }, []);

  const handleStepperDecreaseButton = useCallback(async (quantity: number) => {
    if (quantity === 1) return;
    await updateCartItem({ param: cartItemNumber, body: { quantity: quantity - 1 } });
    await refetchCartList({});
    if (!cartItemNumber) return;
    updateCart({ id: cartItemNumber, quantity: quantity - 1, product: { id, name, price, imageUrl }, isSelected: true });
  }, []);

  return { handleStepperIncreaseButton, handleStepperDecreaseButton };
};

export default useStepperButtons;
